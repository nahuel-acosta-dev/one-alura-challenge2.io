import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Invitation, User, Room

"""
class ChatConsumer(WebsocketConsumer):

    def connect(self):
        async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)
        self.accept()
        self.user = self.scope["user"]
        self.send(text_data=json.dumps(
            {"message": "Se ha conectado %s" % (self.user.username)}))

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            "chat", self.channel_name)

    def receive(self, text_data):
        async_to_sync(self.channel_layer.group_send)(
            "chat",
            {
                "type": "chat.message",
                "text": text_data,
            },
        )

    def chat_message(self, event):
        self.send(text_data=event["text"])"""


class InvitationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # obtenemos la ruta
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'invitation_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        self.user = self.scope["user"]
        print(self.user.username)
        self.send(text_data=json.dumps(
            {"message": "Se ha conectado %s" % (self.user.username)}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        send_type = text_data_json['send_type']
        guest_id = text_data_json['guest_id']
        response = text_data_json['response']
        print(self.user.id)

        if send_type == 'invitation':
            await self.create_invitation(guest_id)
        elif send_type == 'response':
            await self.update_invitation(response)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_invitation',  # es la llamada a la funcion de abajo
                'send_type': send_type,
                'guest_id': guest_id,
                'response': response
            }
        )

    async def send_invitation(self, event):
        send_type = event['send_type']
        guest_id = event['guest_id']
        response = event['response']

        await self.send(text_data=json.dumps({
            'send_type': send_type,
            'guest_id': guest_id,
            'response': response
        }))

    @database_sync_to_async
    def create_invitation(self, guest_id):
        guest_user = User.objects.get(id=guest_id)
        invitation = Invitation.objects.get(
            host_user=self.user, guest_user=guest_user, answered=False)
        print(invitation)
        if invitation:
            invitation.answered = True
            invitation.save()
        Invitation.objects.create(host_user=self.user, guest_user=guest_user)

    @database_sync_to_async
    def update_invitation(self, response):
        if response != '':
            invitation = Invitation.objects.get(
                guest_user=self.user, answered=False)
            invitation.answered = True
            invitation.response = response
            invitation.save()
        else:
            return {'message': 'Error response empty'}

    """async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'invitation_%s' % self.room_name

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

        self.user = self.scope["user"]
        self.send(text_data=json.dumps(
            {"message": "Se ha conectado %s" % (self.user.username)}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None):
        text_data_json = json.loads(text_data)
        send_type = text_data_json['send_type']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "send_invitation",
                "send_type": send_type,
            },
        )

    async def send_invitation(self, event):
        response = event['response']

        await self.send(text_data=json.dumps({
            'response': response
        }))
"""
