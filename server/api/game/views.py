import pandas as pd
from api.rating.models import Rating
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Game
from .rec_model import get_user_recommendation
from .serialiser import GameSerialiser


@api_view(["GET"])
@permission_classes([AllowAny])
def get_games(request):
    games = Game.objects.all()
    serialiser = GameSerialiser(games, many=True)
    return Response(serialiser.data, status=200)


@api_view(["POST"])
@permission_classes([AllowAny])
def get_recommendation(request, id):
    try:
        user = User.objects.get(id=id)
        recommendations = get_user_recommendation(user)
        serializer = GameSerialiser(recommendations, many=True)
        return Response(serializer.data, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)



