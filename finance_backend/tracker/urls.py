from django.urls import path
from .views import ExpenseListCreate, ExpenseStatsView, ExpenseMonthlyChartView, MonthlyCategoryDistributionView

urlpatterns = [
    path('expenses/', ExpenseListCreate.as_view(), name='api-expenses'),
    path('expenses/stats/', ExpenseStatsView.as_view(), name='expense-stats'),
    path('expenses/monthly_chart/', ExpenseMonthlyChartView.as_view(), name='expense-monthly-chart'),
    path('expenses/category_distribution/', MonthlyCategoryDistributionView.as_view(), name='category-distribution'),
]