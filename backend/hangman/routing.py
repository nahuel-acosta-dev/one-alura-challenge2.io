from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path('ws/invitation/<int:room_name>',
         consumers.InvitationConsumer.as_asgi()),
]
