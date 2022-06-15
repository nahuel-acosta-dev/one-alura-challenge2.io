from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
#from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import (api_view, permission_classes,
                                       action)

from hangman.serializers import (TaskSerializer, UserListSerializer,
                                 CustomTokenObtainPairSerializer,
                                 UserSerializer, CustomUserSerializer,
                                 UpdateUserSerializer, PasswordSerializer)

from .models import Task, User


@extend_schema_view(
    list=extend_schema(description='Permite obtener una lista de Tareas'),
    retrieve=extend_schema(description='Permite obtener una tarea'),
    create=extend_schema(description='Permite crear una tarea'),
    update=extend_schema(description='Permite activar una tarea'),
    destroy=extend_schema(description='Permite eliminar una tarea'),
)
class Login(TokenObtainPairView):
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
                    'message': 'Start of successful session'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(GenericAPIView):
    queryset = None

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

    def create(self, request):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({
                'message': 'User created successfully.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'There are errors in the registration',
            'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = self.custom_serializer_class(user)
        return Response(user_serializer.data)

    def update(self, request, pk=None):
        user = self.get_object(pk)
        user_serializer = UpdateUserSerializer(user, data=request.data)
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
        user_destroy = self.model.objects.filter(id=pk).update(is_active=False)
        if user_destroy == 1:
            return Response({
                'message': 'User deleted correctly'
            }, status=status.HTTP_200_OK)
        return Response({
            'message': 'There is no user who wants to delete'
        }, status=status.HTTP_404_NOT_FOUND)


@permission_classes([IsAuthenticated])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
