from django.contrib.admin import site

from .models import Game, Genre, Platform

site.register(Game)
site.register(Genre)
site.register(Platform)
