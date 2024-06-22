from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class TestAuthEndpoint(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')

    def get_token(self):
        obtain_url = '/api/auth/token/'
        obtain_data = {'username': 'testuser', 'password': 'testpassword'}
        obtain_response = self.client.post(obtain_url, obtain_data, format='json')
        return obtain_response.data

    def test_token_obtain_pair(self):
        url = '/api/auth/token/'
        data = {'username': 'testuser', 'password': 'testpassword'}
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_token_refresh(self):
        
        token_response = self.get_token()
        refresh_token = token_response['refresh']

        url = '/api/auth/token/refresh/'
        data = {'refresh': refresh_token}
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_blacklist_refresh_view(self):
        
        token_response = self.get_token()
        refresh_token = token_response['refresh']
        access_token = token_response['access']

        url = '/api/auth/logout/'
        data = {'refresh': refresh_token}

        self.client.credentials(HTTP_AUTHORIZATION='Bearer {0}'.format(access_token))
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "User succesfully logged out")

    def test_register(self):
        url = '/api/auth/register/'
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'testpassword'
        }
        
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('username', response.data)
        self.assertEqual(response.data['username'], 'newuser')
