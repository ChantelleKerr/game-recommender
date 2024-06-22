from api.test import BaseTestCase
from django.urls import reverse
from rest_framework import status


class GameAuthenticatedRequestsTest(BaseTestCase):

  def test_get_games(self):
    url = reverse('get-games')

    self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(self.token))
    response = self.client.get(url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)


  def test_get_game_recommendation(self):
    url = reverse('get-recommendation', kwargs={'id': 1})

    self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(self.token))
    response = self.client.get(url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)


  def test_get_top_rated(self):
    url = reverse('get-top-rated')

    self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(self.token))
    response = self.client.get(url)

    self.assertEqual(response.status_code, status.HTTP_200_OK)

