from django.contrib import admin
from .models import Task, User
from rest_framework_simplejwt import token_blacklist
# Register your models here.

admin.site.register(User)
admin.site.register(Task)
