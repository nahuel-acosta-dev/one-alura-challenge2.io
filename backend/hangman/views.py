from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema, extend_schema_view
from requests import request
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
# from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import (api_view, permission_classes,
                                       action)
from django.contrib.auth.models import User
from hangman.serializers import (TaskSerializer, WordsSerializer, WordsListSerializer,
                                 ProfileSerializer, ProfileListSerializer, UpdateRoomSerializer,
                                 UserListSerializer, InvitationListSerializer, LogoutUserSerializer,
                                 InvitationSerializer, CustomTokenObtainPairSerializer,
                                 UserSerializer, CustomUserSerializer, RoomSerializer,
                                 UpdateUserSerializer, PasswordSerializer)

from .models import Task, User, Profile, Words, Invitation, Room
from .authentication import access_user_data, get_user_data


@extend_schema_view(
    list=extend_schema(description='Permite obtener una lista de Tareas'),
    retrieve=extend_schema(description='Permite obtener una tarea'),
    create=extend_schema(description='Permite crear una tarea'),
    update=extend_schema(description='Permite activar una tarea'),
    destroy=extend_schema(description='Permite eliminar una tarea'),
)
class Login(TokenObtainPairView, GenericAPIView):
    serializer_class = CustomTokenObtainPairSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = authenticate(username=username, password=password)

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_Serializer = CustomUserSerializer(user)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh_token': login_serializer.validated_data.get('refresh'),
                    'user': user_Serializer.data,
                    'id': user_Serializer.data,
                    'message': 'Start of successful session',
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)


class Register(GenericAPIView):
    serializer_class = UserSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'User created successfully.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'There are errors in the registration',
            'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class Logout(GenericAPIView):
    queryset = None
    serializer_class = LogoutUserSerializer

    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Session closed correctly'}, status=status.HTTP_200_OK)
        return Response({'error': 'This user does not exist'}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.GenericViewSet):
    model = User
    serializer_class = UserSerializer
    custom_serializer_class = CustomUserSerializer
    list_serializer_class = UserListSerializer
    update_serizer_class = UpdateUserSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        # la barra \ significa que el punto de abajo pertenece arriba(borrar barra para comprobar)
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(is_active=True).values('id', 'username', 'email')
        return self.queryset

    @action(detail=True, methods=['POST'])
    def set_password(self, request, pk=None):
        permission = access_user_data(request, pk)
        if permission != True:
            return permission
        user = self.get_object(pk)
        password_serializer = PasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            user.set_password(password_serializer.validated_data['password'])
            user.save()
            return Response({
                'message': 'Updated password correctly'
            })
        return Response({
            'message': 'There are errors in the information sent',
            'error': password_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        users = self.get_queryset()
        users_serializer = self.list_serializer_class(users, many=True)
        return Response(users_serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        permission = access_user_data(request, pk)
        if permission != True:
            return permission
        user = self.get_object(pk)
        user_serializer = self.custom_serializer_class(user)
        return Response(user_serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        permission = access_user_data(request, pk)
        if permission != True:
            return permission
        user = self.get_object(pk)
        user_serializer = self.update_serizer_class(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'Updated user correctly updated'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There are errors in the update',
            'error': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        permission = access_user_data(request, pk)
        if permission != True:
            return permission
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'User deleted correctly'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There is no user who wants to delete'
        }, status=status.HTTP_404_NOT_FOUND)


class ProfileViewSet(viewsets.GenericViewSet):
    model = Profile
    model_user = User
    serializer_class = ProfileSerializer
    list_serializer_class = ProfileListSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        # la barra \ significa que el punto de abajo pertenece arriba(borrar barra para comprobar)
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .all()
        return self.queryset

    def list(self, request):
        profile = self.get_queryset()
        profiles_serializer = self.serializer_class(profile, many=True)
        return Response(profiles_serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        permission = access_user_data(request, pk)
        if permission != True:
            return permission
        user = self.model_user.objects.get(id=pk)
        profile = self.model.objects.get(user=user)
        profile_serializer = self.serializer_class(profile)
        return Response(profile_serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, ])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class WordsViewSet(viewsets.GenericViewSet):
    model = Words
    model_user = User
    serializer_class = WordsSerializer
    list_serializer_class = WordsListSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(activated=True).values('id', 'word', 'user', 'created_at')
        return self.queryset

    def list(self, request):
        words = self.get_queryset()
        words_serializer = self.list_serializer_class(words, many=True)
        return Response(words_serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        # debo agregar una validacion al serializer que verifique
        # que la palabra que se esta por crear no sea
        # mayor a 8 ni menor a 1, al igual que tiene el serializer de password
        print(request.data)
        print(request.data['user'])
        user = self.model_user.objects.get(id=request.data['user'])
        word = self.model.objects.filter(
            user=user, word=request.data['word']).last()
        if word:
            word_serializer = self.serializer_class(word)
            return Response({
                'message': 'This user already recorded the word sent.',
                'word': word_serializer.data}, status=status.HTTP_200_OK)
        word_serializer = self.serializer_class(data=request.data)
        if word_serializer.is_valid():
            word_serializer.save()
            data = word_serializer.data
            return Response({
                'message': 'Word created successfully.',
                'word': data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'There are errors in the creation',
            'error': word_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        word = self.get_object(pk)
        word_serializer = self.serializer_class(word)
        return Response(word_serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['GET'])
    def last(self, request):
        user_id = get_user_data(request)
        user = self.model_user.objects.get(id=user_id)
        word = self.model.objects.filter(user=user).last()
        word_serializer = self.serializer_class(word)
        return Response(word_serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        word_destroy = self.model.objects.filter(id=pk)
        if len(word_destroy) == 1:
            word_destroy.delete()
            return Response({
                'message': 'Word deleted correctly'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There is no word who wants to delete'
        }, status=status.HTTP_404_NOT_FOUND)


class InvitationViewSet(viewsets.GenericViewSet):
    model = Invitation
    serializer_class = InvitationSerializer
    list_serializer_class = InvitationListSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self, request):
        if self.queryset is None:
            user_id = get_user_data(request)
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(Q(host_user=int(user_id)) | Q(guest_user=int(user_id))).values(
                    'host_user', 'guest_user', 'response', 'answered', 'created_at').order_by('created_at')

        return self.queryset

    def list(self, request):
        invitations = self.get_queryset(request)
        invitations_serializer = self.list_serializer_class(
            invitations, many=True)
        return Response(invitations_serializer.data, status=status.HTTP_200_OK)


class RoomViewSet(viewsets.GenericViewSet):
    model = Room
    model_user = User
    model_profile = Profile
    serializer_class = RoomSerializer
    update_serizer_class = UpdateRoomSerializer
    permission_classes = (IsAuthenticated,)
    queryset = None

    def get_object(self, pk):
        return get_object_or_404(self.model, pk=pk)

    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.serializer_class().Meta.model.objects\
                .filter(activated=True).values('id', 'word')
        return self.queryset

    def update_profile(self, request):
        user_id = get_user_data(request)
        user = self.model_user.objects.get(id=user_id)
        profile_guest_user = self.model_profile.objects.get(user=user_id)
        """falta completar la actualizacion de ambos perfiles, el creador y invitado"""
        """print(room_serializer.data)
        if room_serializer.data['game_over']:
            result = room_serializer.data['winner']
            if result:
                update_profile = self.model_profile.objects"""

    @action(detail=False, methods=['GET'])
    def activated(self, request):
        user_id = get_user_data(request)
        user = self.model_user.objects.get(id=user_id)
        room = self.model.objects.get(guest_user=user, activated=True)
        if room:
            room_serializer = self.serializer_class(room)
            return Response(room_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Room not found'
            }, status=status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        room = self.get_object(pk)
        room_serializer = self.update_serizer_class(room, data=request.data)
        if room_serializer.is_valid():
            room_serializer.save()
            return Response({
                'message': 'Updated user correctly updated',
                'data': room_serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There are errors in the update',
            'error': room_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
