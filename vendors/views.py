from django.db.models.query import QuerySet
from django.http.response import Http404
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from knox.auth import TokenAuthentication
from .serializers import VendorSerializer

from .models import Vendor

from django.contrib.auth import get_user_model
User = get_user_model()
class BecomeVendorAPIView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    
    def post(self, request, *args, **kwargs):
        userId = request.data['userId']
        vendorName = request.data['vendorName']
        serializer = VendorSerializer(data={'name': vendorName, 'user': userId})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VendorDetailAPIView(APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]

    def post(self, request, *args, **kwargs):
        id = request.data["id"]
        vendor = Vendor.objects.filter(user__pk=id)        
        if vendor:
            serializer = VendorSerializer(vendor, many=True)
            return Response({
                'vendor': serializer.data[0]
            }, status=status.HTTP_200_OK)
        
        return Response({
            'vendor': None
        }, status=status.HTTP_200_OK)