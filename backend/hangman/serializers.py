from attr import fields
from hangman.models import Task, User, Profile, Words, Invitation, Room
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (permission_classes)


class RelatedFieldAlternative(serializers.PrimaryKeyRelatedField):
    # este serializer sirve para mostrar los datos anidados de los modelos foreignKey en las listas
    # que traen los datos filtrados.
    def __init__(self, **kwargs):
        self.serializer = kwargs.pop('serializer', None)
        if self.serializer is not None and not issubclass(self.serializer, serializers.Serializer):
            raise TypeError('"serializer" is not a valid serializer class')

        super().__init__(**kwargs)

    def use_pk_only_optimization(self):
        return False if self.serializer else True

    def to_representation(self, instance):
        if self.serializer:
            return self.serializer(instance, context=self.context).data
        return super().to_representation(instance)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass


class LogoutUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('')


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


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


class ProfileSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'


class ProfileListSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = Profile

    def to_representation(self, instance):
        return{
            'id': instance['id'],
            'user': instance['user'],
            'image': instance['image'],
            'victories': instance['victories'],
            'defeats': instance['defeats'],
            'stars': instance['stars']
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


class WordsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Words
        fields = '__all__'


class WordsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Words
        fields = '__all__'

    def to_representation(self, instance):

        return{
            'id': instance['id'],
            'word': instance['word'],
            'user': instance['user'],
            'created_at': instance['created_at'],
        }


class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = '__all__'


class InvitationListSerializer(serializers.ModelSerializer):
    host_user = RelatedFieldAlternative(
        queryset=User.objects.all(), serializer=CustomUserSerializer)
    guest_user = RelatedFieldAlternative(
        queryset=User.objects.all(), serializer=CustomUserSerializer)

    class Meta:
        model = Invitation
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    word = WordsSerializer(read_only=True)

    class Meta:
        model = Room
        fields = '__all__'


class UpdateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('hits', 'failures', 'activated', 'game_over', 'winner')
