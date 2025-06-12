from django.urls import path
from .views import ExpenseListCreate, ExpenseStatsView, ExpenseMonthlyChartView, MonthlyCategoryDistributionView
from .ml_views import PredictedBudgetView, PredictedBudgetRefreshView

urlpatterns = [
    path('expenses/', ExpenseListCreate.as_view(), name='api-expenses'),
    path('expenses/stats/', ExpenseStatsView.as_view(), name='expense-stats'),
    path('expenses/monthly_chart/', ExpenseMonthlyChartView.as_view(), name='expense-monthly-chart'),
    path('expenses/category_distribution/', MonthlyCategoryDistributionView.as_view(), name='category-distribution'),
    path('predicted-budget/', PredictedBudgetView.as_view(), name='predicted-budget'),
    path('predicted-budget/refresh/', PredictedBudgetRefreshView.as_view(), name='predicted-budget-refresh'),
]