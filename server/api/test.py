from api.game.models import Game, Genre, Platform
from api.rating.models import Rating
from django.contrib.auth.models import User
from django.test import TestCase


class BaseTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.create_genres()
        cls.create_platforms()
        cls.create_games()
        cls.create_users()
        cls.create_ratings()

    @classmethod
    def create_genres(cls):
        cls.genres = {
            'Adventure': Genre.objects.create(name='Adventure'),
            'Strategy': Genre.objects.create(name='Strategy'),
            'Indie': Genre.objects.create(name='Indie'),
            'RPG': Genre.objects.create(name='RPG'),
            'MMO': Genre.objects.create(name='MMO'),
            'Shooter': Genre.objects.create(name='Shooter'),
        }

    @classmethod
    def create_platforms(cls):
        cls.platforms = {
            'Nintendo': Platform.objects.create(name='Nintendo'),
            'Mobile': Platform.objects.create(name='Mobile'),
            'PC': Platform.objects.create(name='PC'),
            'Playstation': Platform.objects.create(name='Playstation'),
            'Xbox': Platform.objects.create(name='Xbox'),
        }

    @classmethod
    def create_games(cls):
        game_data = [
            {
                'name': 'Pokemon Lets Go',
                'image': 'test-img.png',
                'genres': ['Adventure', 'RPG'],
                'platforms': ['Nintendo', 'Mobile']
            },
            {
                'name': 'Halo Infinite',
                'image': 'halo-img.png',
                'genres': ['Shooter', 'MMO'],
                'platforms': ['Xbox', 'PC']
            },
            {
                'name': 'Minecraft',
                'image': 'minecraft-img.png',
                'genres': ['Indie', 'Adventure'],
                'platforms': ['Mobile', 'PC', 'Playstation', 'Xbox']
            },
            {
                'name': 'Final Fantasy XIV',
                'image': 'ffxiv-img.png',
                'genres': ['RPG', 'MMO'],
                'platforms': ['Playstation', 'PC']
            },
            {
                'name': 'Among Us',
                'image': 'amongus-img.png',
                'genres': ['Indie', 'Strategy'],
                'platforms': ['Mobile', 'PC', 'Nintendo']
            },
        ]

        cls.games = {}
        for data in game_data:
            game = Game.objects.create(
                name=data['name'],
                image=data['image']
            )
            for genre in data['genres']:
                game.genres.add(cls.genres[genre])
            for platform in data['platforms']:
                game.platforms.add(cls.platforms[platform])
            game.save()
            cls.games[game.name] = game

    @classmethod
    def create_users(cls):
        cls.users = {
            'UserA': User.objects.create_user(username='UserA', password='password123'),
            'UserB': User.objects.create_user(username='UserB', password='password123'),
            'UserC': User.objects.create_user(username='UserC', password='password123'),
        }
    
    @classmethod
    def create_ratings(cls):
        ratings_data = {
            'UserA': {
                'Pokemon Lets Go': 5,
                'Halo Infinite': 3,
                'Minecraft': 4,
            },
            'UserB': {
                'Pokemon Lets Go': 4,
                'Minecraft': 5,
                'Final Fantasy XIV': 4,
                'Among Us': 3,
            },
            'UserC': {
                'Halo Infinite': 5,
                'Minecraft': 3,
                'Among Us': 4,
                'Final Fantasy XIV': 2,
                'Pokemon Lets Go': 2,
            },
        }
        for username, games_ratings in ratings_data.items():
            user = cls.users[username]
            for game_name, rating in games_ratings.items():
                game = cls.games[game_name]
                platform = game.platforms.first()
                Rating.objects.create(user=user, game=game, rating=rating, platform=platform)