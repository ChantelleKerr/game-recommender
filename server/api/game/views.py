from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Game
from .serialiser import GameSerialiser


@api_view(["GET"])
@permission_classes([AllowAny])
def get_games(request):
    games = Game.objects.all()
    serialiser = GameSerialiser(games, many=True)
    return Response(serialiser.data, status=200)