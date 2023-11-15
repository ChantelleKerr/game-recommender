from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serialiser import RatingSerialiser


@api_view(["POST"])
@permission_classes([])
def add_rating(request):
    serialiser = RatingSerialiser(data=request.data)
    if serialiser.is_valid():
        serialiser.save()
        return Response(serialiser.data, status=200)
    else:
        return Response(serialiser.errors, status=400)