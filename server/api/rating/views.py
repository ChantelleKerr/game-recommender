from api.game.models import Platform
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Rating
from .serialiser import GetRatingSerialiser, RatingSerialiser


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_rating(request):
    print(request.data)
    if isinstance(request.data['platform'], str):
            request.data['platform'] = Platform.objects.get(name=request.data['platform']).id
    serialiser = RatingSerialiser(data=request.data)

    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=200)
    else:
        return Response(serialiser.errors, status=400)
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_ratings(request, id):
    ratings = Rating.objects.filter(user=id)
    serialiser = GetRatingSerialiser(ratings, many=True)
    return Response(serialiser.data, status=200)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_rating(request, id):
    rating = Rating.objects.get(pk=id)
    rating.delete()
    return Response({"message": "Rating deleted successfully"}, status=204)