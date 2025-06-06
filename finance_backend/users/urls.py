from django.urls import path
from .views import CustomAuthToken, RegisterUser, RegisterView

urlpatterns = [
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('register/', RegisterUser.as_view(), name='register'),
    path("api/register", RegisterView.as_view(), name="register"),
]