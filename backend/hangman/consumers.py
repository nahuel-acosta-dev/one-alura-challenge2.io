import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync

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
        self.send(text_data=event["text"])
"""


class InvitationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
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
        self.user = self.scope["user"]
        self.send(text_data=json.dumps(
            {"message": "Se ha desconectado %s" % (self.user.username)}))

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
