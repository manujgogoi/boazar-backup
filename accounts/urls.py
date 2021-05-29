from django.urls import path
from .views import LoginAPIView, RegisterAPIView, UserAPIView, UsernameExistsAPIView
from knox import views as knoxViews

app_name='accounts'

urlpatterns = [
    path('user/', UserAPIView.as_view(), name='api_get_user' ),
    path('register/', RegisterAPIView.as_view(), name='api_register_user' ),
    path('login/', LoginAPIView.as_view(), name='knox_login'),
    path('logout/', knoxViews.LogoutView.as_view(), name='knox_logout'),
    path('logoutall/', knoxViews.LogoutAllView.as_view(), name='knox_logoutall'),
    path('username_exists/', UsernameExistsAPIView.as_view(), name='api_username_exist'),
]