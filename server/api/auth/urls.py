from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import BlacklistRefreshView, MyTokenObtainPairView, register

app_name = 'auth'

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', BlacklistRefreshView.as_view(), name='logout'),
    path("register/", register, name='register'),
]