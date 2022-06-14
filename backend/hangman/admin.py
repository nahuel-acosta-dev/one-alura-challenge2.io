from django.contrib import admin
from .models import Task, User
from rest_framework_simplejwt import token_blacklist

admin.site.register(User)
admin.site.register(Task)
