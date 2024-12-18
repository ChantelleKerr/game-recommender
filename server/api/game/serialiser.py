from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Game, Genre, Platform


class GenreSerializer(ModelSerializer):
    class Meta:
        model = Genre
        fields =  '__all__'

class PlatformSerializer(ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

class GameSerialiser(ModelSerializer):
    platforms = PlatformSerializer(many=True)
    genres = GenreSerializer(many=True)
    class Meta:
          model = Game
          fields = '__all__'



class TopRatedGameSerializer(ModelSerializer):
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2, coerce_to_string=False)
    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'average_rating']
