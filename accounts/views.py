from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import LoginSerializer, UserSerializer
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.renderers import JSONRenderer

from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication

from vendors.models import Vendor, Staff
from vendors.serializers import VendorSerializer

from django.contrib.auth import login

User = get_user_model()


class UserCheckAPIView(APIView):
    serializer = UserSerializer
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]

    def post(self, request, *args, **kwargs):
        id = request.data["id"]
        user = User.objects.get(pk=id)
        try:
            vendor = Vendor.objects.get(user=id);
        except:
            vendor = False

        if vendor:
            v = {
                'id': vendor.id,
                'name': vendor.name,
            }
        else:
            v = {'id': False, }

        if user:
            return Response({
                'id' : user.id,
                'username': user.username,
                'last_login': user.last_login,
                'is_superuser': user.is_superuser,
                'phone_number': user.phone_number,
                'vendor': v
            })   

        return Response({
            "status": False,
            "user": user
        })


class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
            'status': True,
            'message': 'Account created successfully'
        })


class LoginAPIView(KnoxLoginView):
    permission_classes = [AllowAny,]

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super().post(request, format=None)

class UserAPIView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]

    def post(self, request, *args, **kwargs):
        user = request.user
        return Response({
            'username': user.username,
            'id': user.id
        })
