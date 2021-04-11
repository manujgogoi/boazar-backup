from django.urls import path
from .views import LoginAPIView, RegisterAPIView, UserAPIView, UserCheckAPIView
from knox import views as knoxViews

app_name='accounts'

urlpatterns = [
    path('api/usercheck/', UserCheckAPIView.as_view(), name='api_user_check' ),
    path('api/register/', RegisterAPIView.as_view(), name='api_register_user' ),
    path('api/login/', LoginAPIView.as_view(), name='knox_login'),
    path('api/user/', UserAPIView.as_view(), name='api_user'),
    path('api/logout/', knoxViews.LogoutView.as_view(), name='knox_logout'),
    path('api/logoutall/', knoxViews.LogoutAllView.as_view(), name='knox_logoutall'),
]