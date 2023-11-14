from django.urls import path

from .views import LoginView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='user-login'),
]