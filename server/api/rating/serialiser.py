from rest_framework.serializers import ModelSerializer

from .models import Rating


class RatingSerialiser(ModelSerializer):
  class Meta:
        model = Rating
        fields = '__all__'