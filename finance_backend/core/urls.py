from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('tracker.urls')),  # <-- ADD THIS LINE
    path("", include("users.urls")),
]