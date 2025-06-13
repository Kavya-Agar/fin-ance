from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import BudgetPrediction, Expense
from .serializers import BudgetPredictionSerializer
import tensorflow as tf
import numpy as np
import pandas as pd
import os
from django.conf import settings

BUDGET_MODEL_PATH = '/Users/kavyaagar/finance/finance_backend/ml_training/ml_models/tf_budget_forecast.keras'
CATEGORY_MODEL_PATH = '/Users/kavyaagar/finance/finance_backend/ml_training/ml_models/tf_category_forecast.keras'

MODEL_PATH = BUDGET_MODEL_PATH
_budget_model = None

def get_budget_model():
    global _budget_model
    if _budget_model is None:
        try:
            print(f"Loading model from: {BUDGET_MODEL_PATH}")
            _budget_model = tf.keras.models.load_model(BUDGET_MODEL_PATH)
        except Exception as e:
            print(f"Error loading model: {e}")
            _budget_model = None
    return _budget_model

class PredictedBudgetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        now = timezone.now()
        month = (now.replace(day=1) + pd.DateOffset(months=1)).date()
        predictions = BudgetPrediction.objects.filter(user=user, month=month)
        serializer = BudgetPredictionSerializer(predictions, many=True)
        return Response(serializer.data)

class PredictedBudgetRefreshView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        now = timezone.now()
        next_month = (now.replace(day=1) + pd.DateOffset(months=1)).date()
        # Get user expenses and aggregate as needed
        expenses = Expense.objects.filter(user=user)
        df = pd.DataFrame(list(expenses.values('date', 'amount', 'category')))
        if df.empty:
            return Response({"detail": "No expenses to predict from."})
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.to_period('M')
        # Example: For each category, predict next month's spend
        categories = df['category'].unique()
        BudgetPrediction.objects.filter(user=user, month=next_month).delete()
        results = []
        for category in categories:
            cat_monthly = df[df['category'] == category].groupby('month')['amount'].sum().sort_index()
            # Prepare input for model (e.g., last 6 months, pad if needed)
            last_months = cat_monthly.values[-6:] if len(cat_monthly) >= 6 else np.pad(cat_monthly.values, (6-len(cat_monthly), 0))
            last_months = last_months.astype(np.float32)  # Ensure numeric dtype
            X = np.array([last_months], dtype=np.float32)  # 2D array, float32 dtype

            # If your model expects 3D input (e.g., LSTM with input_shape=(6,1)):
            if len(X.shape) == 2:
                X = X.reshape((X.shape[0], X.shape[1], 1))  # shape (1, 6, 1)
            model = get_budget_model()

            print("Input shape to model:", X.shape)
            print("Model expects input shape:", model.input_shape)
            predicted_amount = float(model.predict(X)[0][0])
            pred = BudgetPrediction.objects.create(
                user=user,
                category=category,
                predicted_amount=predicted_amount,
                month=next_month,
            )
            results.append(pred)
        serializer = BudgetPredictionSerializer(results, many=True)
        return Response(serializer.data)


CATEGORIES = ["Food", "Travel", "Academics", "Rent", "Groceries", "Other"]
MODEL_PATH = CATEGORY_MODEL_PATH
SCALER_PATH = MODEL_PATH.replace('.keras', '_scaler.pkl')
_category_model = None
_category_scaler = None

def get_category_model_and_scaler():
    global _category_model, _category_scaler
    if _category_model is None:
        _category_model = tf.keras.models.load_model(CATEGORY_MODEL_PATH)
    if _category_scaler is None:
        _category_scaler = pd.read_pickle(SCALER_PATH)
    return _category_model, _category_scaler

class CategoryForecastView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        expenses = Expense.objects.filter(user=user)
        df = pd.DataFrame(list(expenses.values('date', 'amount', 'category')))
        if df.empty:
            return Response({cat: 0 for cat in CATEGORIES})
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.to_period('M')
        monthly = df.pivot_table(index='month', columns='category', values='amount', aggfunc='sum', fill_value=0)
        monthly = monthly.reindex(columns=CATEGORIES, fill_value=0)
        # Prepare input: last N_MONTHS months
        N_MONTHS = 6
        if len(monthly) < N_MONTHS:
            pad = np.zeros((N_MONTHS - len(monthly), len(CATEGORIES)))
            input_seq = np.vstack([pad, monthly.values])
        else:
            input_seq = monthly.values[-N_MONTHS:]
        model, scaler = get_category_model_and_scaler()
        scaled_input = scaler.transform(input_seq)
        X = scaled_input.flatten().reshape(1, -1)
        pred_scaled = model.predict(X)
        # pred = scaler.inverse_transform(np.vstack([input_seq[1:], pred_scaled]))[-1]
        pred = scaler.inverse_transform(pred_scaled)[0]
        result = {cat: float(val) for cat, val in zip(CATEGORIES, pred)}
        return Response(result)