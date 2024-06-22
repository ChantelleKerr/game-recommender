from api.game.models import Game
from api.test import BaseTestCase
from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status

from ..models import Rating


class RatingUnauthenticatedRequestsTest(BaseTestCase):

  def test_get_ratings(self):
    url = reverse('get-ratings', kwargs={'id': 1})
    response = self.client.get(url)

    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


  def test_add_rating(self):
    url = reverse('add-rating')
    user = User.objects.first()
    game = Game.objects.first()
    
    game_dict = {
      'id': game.id,
      'name': game.name,
      'image': game.image,
      'genres': [{'name': genre.name} for genre in game.genres.all()],
      'platforms': [{'name': platform.name} for platform in game.platforms.all()]
    }

    body = {
        'user': user.id,
        'game': game_dict,
        'platform': 'Xbox',
        'rating': 3
    }

    response = self.client.post(url, body, format='json')

    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


  def test_delete_rating(self):
    rating = Rating.objects.first()
    url = reverse('delete-rating', kwargs={'id': rating.id})

    response = self.client.delete(url)

    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
