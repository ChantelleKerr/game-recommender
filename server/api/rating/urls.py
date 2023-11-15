from django.urls import path

from . import views

urlpatterns = [
  path('create/', views.add_rating, name='add_rating'),
]