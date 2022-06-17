from attr import fields
from hangman.models import Task, User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (permission_classes)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class LogoutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

    def to_representation(self, instance):
        return{
            'id': instance['id'],
            'username': instance['username'],
            'email': instance['email'],
        }


class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=128, min_length=6, write_only=True)
    password2 = serializers.CharField(
        max_length=128, min_length=6, write_only=True)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({
                'password': 'Both equal passwords must enter'})
        return data


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
