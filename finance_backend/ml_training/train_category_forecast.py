import os
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import MinMaxScaler
from sqlalchemy import create_engine

BUDGET_MODEL_PATH = '/Users/kavyaagar/finance/finance_backend/ml_training/ml_models/tf_budget_forecast.keras'
CATEGORY_MODEL_PATH = '/Users/kavyaagar/finance/finance_backend/ml_training/ml_models/tf_category_forecast.keras'

DB_NAME = "finance_db"
DB_USER = "kavya"
DB_PASSWORD = "yourpassword"
DB_HOST = "localhost"
DB_PORT = "5432"
CATEGORIES = ["Food", "Travel", "Academics", "Rent", "Groceries", "Other"]
MODEL_PATH = CATEGORY_MODEL_PATH
N_MONTHS = 6 # Use last 6 months as input

db_url = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(db_url)

def load_monthly_data(user_id):
    query = f"""
        SELECT date, category, amount FROM tracker_expense
        WHERE user_id = {user_id}
        ORDER BY date ASC;
    """
    df = pd.read_sql(query, engine)
    if df.empty:
        return None
    df['date'] = pd.to_datetime(df['date'])
    df['month'] = df['date'].dt.to_period('M')
    # Pivot: rows=month, cols=category, vals=amount
    monthly = df.pivot_table(index='month', columns='category', values='amount', aggfunc='sum', fill_value=0)
    monthly = monthly.reindex(columns=CATEGORIES, fill_value=0)
    return monthly

def create_sequences(data, n_months=N_MONTHS):
    X, y = [], []
    for i in range(len(data) - n_months):
        X.append(data[i:i+n_months].flatten())
        y.append(data[i+n_months])
    return np.array(X), np.array(y)

def train_and_save_model(user_id, epochs=500):
    monthly = load_monthly_data(user_id)
    if monthly is None or len(monthly) <= N_MONTHS:
        print("Not enough data to train the model.")
        return None
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(monthly)
    X, y = create_sequences(scaled, n_months=N_MONTHS)
    if len(X) == 0:
        print("Not enough sequences to train the model.")
        return None
    model = Sequential([
        Dense(64, activation='relu', input_shape=(X.shape[1],)),
        Dense(len(CATEGORIES))  # One output per category
    ])
    model.compile(optimizer='adam', loss='mse')
    model.fit(X, y, epochs=epochs, verbose=0)
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    model.save(MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")
    scaler_path = MODEL_PATH.replace('.keras', '_scaler.pkl')
    pd.to_pickle(scaler, scaler_path)
    print(f"Scaler saved to {scaler_path}")
    return model, scaler

if __name__ == '__main__':
    USER_ID = 4
    train_and_save_model(USER_ID)
