#from django.shortcuts import render
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets

from hangman.serializers import TaskSerializer
from hangman.models import Task
# Create your views here.


@extend_schema_view(
    list=extend_schema(description='Permite obtener una lista de Tareas'),
    retrieve=extend_schema(description='Permite obtener una tarea'),
    create=extend_schema(description='Permite crear una tarea'),
    update=extend_schema(description='Permite activar una tarea'),
    destroy=extend_schema(description='Permite eliminar una tarea'),
)
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
