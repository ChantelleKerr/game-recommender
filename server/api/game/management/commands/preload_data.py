# server/api/management/commands/preload_data.py

from api.game.models import Platform, Genre, Game
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
