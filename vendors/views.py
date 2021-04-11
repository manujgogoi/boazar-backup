from django.db.models.query import QuerySet
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import VendorSerializer

class RegisterAPIView(APIView):
    pass

