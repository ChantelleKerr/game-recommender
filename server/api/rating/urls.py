from django.urls import path

from . import views

urlpatterns = [
  path('create/', views.add_rating, name='add_rating'),
  path('get/<int:id>', views.get_ratings, name='get_ratings'),
]