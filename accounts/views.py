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
from rest_framework import status

from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication

from vendors.models import Vendor, Staff
from vendors.serializers import VendorSerializer

from django.contrib.auth import login

User = get_user_model()



class UserAPIView(APIView):
    serializer = UserSerializer
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]

    def post(self, request, *args, **kwargs):
        id = request.data["id"]
        user = User.objects.get(pk=id)
        if user:
            return Response({
                'id' : user.id,
                'username': user.username,
                'last_login': user.last_login,
                'is_superuser': user.is_superuser,
                'phone_number': user.phone_number,
            })   

        return Response({
            "status": False,
            "user": user
        })


class RegisterAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Register error >>>>>>>>>>>>>>>>>>>> ", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(KnoxLoginView):
    permission_classes = [AllowAny,]

    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super().post(request, format=None)

class UsernameExistsAPIView(APIView):
    permission_classes = [AllowAny,]
    def post(self, request, *args, **kwargs):
        """
        First check username key is present in request
        if not then set name = 'anonymous'
        Return true if username matches
        """
        name = request.data.get('username', 'anonymous')
        if User.objects.filter(username=name).exists():
            return Response({
                'message': True
            })
        return Response({
            'message': False
        })

