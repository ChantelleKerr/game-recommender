from api.rating.models import Rating
from django.contrib.auth.models import User
from django.db.models import Avg, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Game
from .rec_model import get_user_games_recommendations
from .serialiser import GameSerialiser, TopRatedGameSerializer


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
        recommendations = get_user_games_recommendations(user)
        serializer = GameSerialiser(recommendations, many=True)
        return Response(serializer.data, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_top_rated(request):
    top_rated_games = (
        Game.objects
        .annotate(average_rating=Avg('rating__rating'))
        .filter(~Q(average_rating=None)) 
        .order_by('-average_rating')[:10]
    )

    serializer = TopRatedGameSerializer(top_rated_games, many=True)
    return Response(serializer.data, status=200)
