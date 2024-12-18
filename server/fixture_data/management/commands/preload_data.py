from api.game.models import Game, Genre, Platform
from api.rating.models import Rating
from django.contrib.auth.models import User
from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Preload data into the database if not already present'

    def handle(self, *args, **kwargs):
        if not Platform.objects.exists():
            self.stdout.write(self.style.SUCCESS('Preloading Platform Data...'))
            call_command('loaddata', 'platforms.json')
            self.stdout.write(self.style.SUCCESS('Platform Data Preloaded Successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('Platform Data already exists. Skipping preload.'))

        if not Genre.objects.exists():
            self.stdout.write(self.style.SUCCESS('Preloading Genre Data...'))
            call_command('loaddata', 'genres.json')
            self.stdout.write(self.style.SUCCESS('Genre Data Preloaded Successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('Genre Data already exists. Skipping preload.'))

        if not Game.objects.exists():
            self.stdout.write(self.style.SUCCESS('Preloading Game Data...'))
            call_command('loaddata', 'games.json')
            self.stdout.write(self.style.SUCCESS('Game Data Preloaded Successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('Game Data already exists. Skipping preload.'))

        if User.objects.count() <= 1:
            self.stdout.write(self.style.SUCCESS('Preloading User Data...'))
            call_command('loaddata', 'users.json')
            self.stdout.write(self.style.SUCCESS('User Data Preloaded Successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('User Data already exists. Skipping preload.'))

        if not Rating.objects.exists():
            self.stdout.write(self.style.SUCCESS('Preloading Rating Data...'))
            call_command('loaddata', 'ratings.json')
            self.stdout.write(self.style.SUCCESS('Rating Data Preloaded Successfully'))
        else:
            self.stdout.write(self.style.SUCCESS('Rating Data already exists. Skipping preload.'))
