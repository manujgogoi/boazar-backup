from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }


    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            if User.objects.filter(username=username).exists():
                user = authenticate(request=self.context.get('request'), username=username, password=password)
            else:
                msg = {
                    'message': 'Invalid username or password',
                    'status': False
                }    
                raise serializers.ValidationError(msg)
            
            if not user:
                msg = {
                    'message': 'Invalid username or password',
                    'status': False
                } 
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = {
                'message': 'Username and password not found in request',
                'status': False
            }
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs

class UserCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']