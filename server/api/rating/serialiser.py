from api.game.serialiser import GameSerialiser, PlatformSerializer
from rest_framework.serializers import ModelSerializer

from .models import Rating


class RatingSerialiser(ModelSerializer):
  game = GameSerialiser()  
  platform = PlatformSerializer()
  class Meta:
        model = Rating
        fields = '__all__'