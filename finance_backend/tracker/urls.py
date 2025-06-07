from django.urls import path
from .views import ExpenseListCreate

urlpatterns = [
    path('expenses/', ExpenseListCreate.as_view(), name='api-expenses'),
]