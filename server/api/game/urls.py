from django.urls import path

from . import views

urlpatterns = [
  path('get_games/', views.get_games, name='get-games'),
  path('get_recommendation/<int:id>', views.get_recommendation, name="get-recommendation"),
  path('get_top_rated/', views.get_top_rated, name='get-top-rated'),
]
