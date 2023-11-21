from django.urls import path

from . import views

urlpatterns = [
  path('get_games/', views.get_games, name='get_games'),
  path('get_recommendation/<int:id>', views.get_recommendation, name="get-recommendation")
]
