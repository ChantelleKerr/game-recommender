from django.urls import path

from . import views

urlpatterns = [
  path('create/', views.add_rating, name='add-rating'),
  path('get/<int:id>', views.get_ratings, name='get-ratings'),
  path('delete/<int:id>', views.delete_rating, name="delete-rating")
]