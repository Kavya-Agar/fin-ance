from rest_framework import serializers
from .models import Expense
from .models import BudgetPrediction

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['user']

class BudgetPredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetPrediction
        fields = ['category', 'predicted_amount', 'month']
