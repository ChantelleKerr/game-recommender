from api.test import BaseTestCase
from django.urls import reverse
from rest_framework import status


class GameUnAuthenticatedRequestsTest(BaseTestCase):

  def test_get_games(self):
    url = reverse('get-games')
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_get_game_recommendation(self):
    url = reverse('get-recommendation', kwargs={'id': 1})
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

  def test_get_top_rated(self):
    url = reverse('get-top-rated')
    response = self.client.get(url)
    self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

