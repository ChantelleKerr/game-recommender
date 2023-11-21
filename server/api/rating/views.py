from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import Platform, Rating
from .serialiser import RatingSerialiser


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_rating(request):
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
    print(ratings)
    serialiser = RatingSerialiser(ratings, many=True)
    return Response(serialiser.data, status=200)
