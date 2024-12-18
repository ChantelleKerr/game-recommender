from api.game.models import Game, Genre, Platform
from api.game.serialiser import GameSerialiser, PlatformSerializer
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Rating


class RatingSerialiser(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    game = serializers.PrimaryKeyRelatedField(queryset=Game.objects.all())
    platform = serializers.PrimaryKeyRelatedField(queryset=Platform.objects.all())

    class Meta:
        model = Rating
        fields = '__all__'

class GetRatingSerialiser(serializers.ModelSerializer):
    game = GameSerialiser()
    platform = PlatformSerializer()

    class Meta:
        model = Rating
        fields = '__all__'