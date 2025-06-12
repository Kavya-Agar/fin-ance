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

MODEL_PATH = os.path.join(settings.BASE_DIR,'ml_training', 'ml_models', 'tf_budget_forecast.keras')
_budget_model = None

def get_budget_model():
    global _budget_model
    if _budget_model is None:
        try:
            print(f"Loading model from: {MODEL_PATH}")
            _budget_model = tf.keras.models.load_model(MODEL_PATH)
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
