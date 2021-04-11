from django.urls import path
from .views import RegisterAPIView

app_name='vendors'

urlpatterns = [
    path('api/register', RegisterAPIView.as_view(), name='api-register-vendor' ),
]
