from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/invitation/(?P<room_name>\w+)/$',
            consumers.InvitationConsumer.as_asgi()),
]

"""
re_path(r'ws/chat/$', consumers.ChatConsumer.as_asgi()),
path('ws/invitation/<int:room_name>',
         consumers.InvitationConsumer.as_asgi()),"""
