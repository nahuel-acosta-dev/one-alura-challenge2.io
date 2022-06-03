from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):

    def __str__(self):
        return f"{self.username}"


class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.BooleanField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __Str__(self):
        return self.title

    class Meta:
        ordering = ['created_at']
