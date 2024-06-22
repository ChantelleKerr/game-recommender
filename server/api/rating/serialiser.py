from api.game.models import Game, Genre, Platform
from api.game.serialiser import GameSerialiser, PlatformSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Rating


class RatingSerialiser(ModelSerializer):
  game = GameSerialiser()  
  platform = serializers.CharField(source='platform.name')
  class Meta:
        model = Rating
        fields = '__all__'

  def create(self, validated_data):
        game_data = validated_data.pop('game')
        platforms_data = game_data.pop('platforms')
        genres_data = game_data.pop('genres')
        
        platform_name = validated_data.pop('platform')['name']
        platform = Platform.objects.get(name=platform_name)

        game = Game.objects.get(**game_data)

        for platform_data in platforms_data:
            platform_instance = Platform.objects.get(name=platform_data['name'])
            game.platforms.add(platform_instance)

        for genre_data in genres_data:
            genre = Genre.objects.get(name=genre_data['name'])
            game.genres.add(genre)

        game.save()

        rating = Rating.objects.create(game=game, platform=platform, **validated_data)
        return rating

  def update(self, instance, validated_data):
        game_data = validated_data.pop('game')
        platforms_data = game_data.pop('platforms')
        genres_data = game_data.pop('genres')
        
        platform_name = validated_data.pop('platform')['name']
        platform, created = Platform.objects.get_or_create(name=platform_name)

        game, created = Game.objects.get_or_create(**game_data)

        game.platforms.clear()
        for platform_data in platforms_data:
            platform_instance, created = Platform.objects.get_or_create(name=platform_data['name'])
            game.platforms.add(platform_instance)

        game.genres.clear()
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(name=genre_data['name'])
            game.genres.add(genre)

        game.save()

        instance.game = game
        instance.platform = platform
        instance.rating = validated_data.get('rating', instance.rating)
        instance.save()
        return instance