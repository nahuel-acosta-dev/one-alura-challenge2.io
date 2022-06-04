#from django.shortcuts import render
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
from rest_framework.decorators import api_view, permission_classes

from hangman.serializers import (TaskSerializer,
                                 CustomTokenObtainPairSerializer, CustomUserSerializer)

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
                    'refresh-token': login_serializer.validated_data.get('refresh'),
                    'user': user_Serializer.data,
                    'message': 'Start of successful session'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Incorrect password or username'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(GenericAPIView):
    def post(self, request, *args, **kwargs):
        user = User.objects.filter(id=request.data.get('user', 0))
        if user.exists():
            RefreshToken.for_user(user.first())
            return Response({'message': 'Session closed correctly'}, status=status.HTTP_200_OK)
        return Response({'error': 'This user does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
