from rest_framework.serializers import ModelSerializer

from .models import Game, Genre, Platform


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class PlatformSerializer(ModelSerializer):
    class Meta:
        model = Platform
        fields = ['name']

class GameSerialiser(ModelSerializer):
    platforms = PlatformSerializer(many=True)
    genres = GenreSerializer(many=True)
    class Meta:
          model = Game
          fields = '__all__'