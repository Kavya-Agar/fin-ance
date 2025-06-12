import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler
from sqlalchemy import create_engine
from datetime import datetime
import warnings

# CONFIGURATION
DB_NAME = "finance_db"
DB_USER = "kavya"
DB_PASSWORD = "yourpassword"
DB_HOST = "localhost"
DB_PORT = "5432"
MODEL_PATH = "ml_models/tf_budget_forecast.keras"
N_STEPS = 5  # Number of months in LSTM input sequence

# Build SQLAlchemy engine
db_url = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(db_url)

def load_expense_data(user_id, category):
    """Load and aggregate monthly spendings for a user and category (case-insensitive)."""
    query = f"""
        SELECT date, amount FROM tracker_expense
        WHERE user_id = {user_id} AND LOWER(category) = LOWER('{category}')
        ORDER BY date ASC;
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return None
    df['date'] = pd.to_datetime(df['date'])
    df.set_index('date', inplace=True)
    monthly = df.resample('ME').sum()
    monthly = monthly.rename(columns={'amount': 'total_spend'})
    return monthly

def create_sequences(data, n_steps=N_STEPS):
    """Create LSTM sequences."""
    X, y = [], []
    for i in range(n_steps, len(data)):
        X.append(data[i - n_steps:i])
        y.append(data[i])
    return np.array(X), np.array(y)

def build_model(input_shape):
    """Build and compile the LSTM model."""
    model = Sequential([
        LSTM(50, activation='relu', input_shape=input_shape),
        Dense(1)
    ])
    model.compile(optimizer='adam', loss='mse')
    return model

def train_and_save_model(user_id, category, epochs=100):
    """Train the model for a specific user and category and save it."""
    monthly = load_expense_data(user_id, category)
    if monthly is None or len(monthly) <= N_STEPS:
        warnings.warn("Not enough data to train the model.")
        return None

    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(monthly[['total_spend']])
    X, y = create_sequences(scaled, n_steps=N_STEPS)
    if len(X) == 0:
        warnings.warn("Not enough sequences to train the model.")
        return None

    model = build_model((X.shape[1], X.shape[2]))
    model.fit(X, y, epochs=epochs, verbose=0)

    # Save the model in Keras 3+ compatible format
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    model.save(MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")

    # Save the scaler for later inverse_transform (optional)
    scaler_path = MODEL_PATH.replace('.keras', f'_{category}_scaler.pkl')
    pd.to_pickle(scaler, scaler_path)
    print(f"Scaler saved to {scaler_path}")

    # Predict next month as a test
    last_sequence = scaled[-N_STEPS:].reshape((1, N_STEPS, 1))
    prediction = model.predict(last_sequence)
    predicted_amount = scaler.inverse_transform(prediction)[0][0]
    next_month = (monthly.index[-1] + pd.DateOffset(months=1)).strftime('%Y-%m-01')

    print(f"Next month ({next_month}) predicted amount for '{category}': ${predicted_amount:.2f}")

    return {
        'category': category,
        'predicted_amount': round(predicted_amount, 2),
        'month': next_month
    }

# Example usage
if __name__ == '__main__':
    USER_ID = 4
    CATEGORY = "Other"  # Try "food", "FOOD", etc. (case-insensitive)
    result = train_and_save_model(USER_ID, CATEGORY)
    if result:
        print("Forecast:", result)
    else:
        print("Training was not successful.")
