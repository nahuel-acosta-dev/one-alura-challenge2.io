import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Invitation, User, Room, Words


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
        host_id = text_data_json['host_id']
        response = text_data_json['response']
        word_id = text_data_json['word_id']

        if send_type == 'invitation':
            await self.create_invitation(host_id, word_id)
        elif send_type == 'response':
            await self.update_invitation(response, host_id)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_invitation',  # es la llamada a la funcion de abajo
                'send_type': send_type,
                'host_id': host_id,
                'response': response,
                'word_id': word_id,
            }
        )

    async def send_invitation(self, event):
        send_type = event['send_type']
        host_id = event['host_id']
        response = event['response']
        word_id = event['word_id']

        await self.send(text_data=json.dumps({
            'send_type': send_type,
            'host_id': host_id,
            'response': response,
            'word_id': word_id,
        }))

    @database_sync_to_async
    def create_invitation(self, host_id, word_id):
        host_user = User.objects.get(id=host_id)
        try:
            invitation = Invitation.objects.get(
                host_user=host_user, guest_user=self.user, word_id=word_id, answered=False)
            print(invitation)
            if invitation:
                invitation.answered = True
                invitation.save()
        except:
            print('no se encontraron invitaciones de este usuario')
        Invitation.objects.create(
            host_user=host_user, guest_user=self.user, word_id=word_id)

    @database_sync_to_async
    def update_invitation(self, response, host_id):
        if response != '':
            user = User.objects.get(id=host_id)
            invitation = Invitation.objects.filter(
                guest_user=user, answered=False).last()
            invitation.answered = True
            invitation.response = response
            invitation.save()
            if response == True:
                try:
                    room = Room.objects.get(host_user=invitation.host_user,
                                            guest_user=invitation.guest_user, activated=True)
                    if room:
                        room.activated = False
                        room.save()
                except:
                    print('No active rooms were found')

                print(invitation.word_id)
                print(Words.objects.get(
                    id=invitation.word_id, user=invitation.host_user))
                # el error al aceptar la invitation esta en word
                word = Words.objects.get(
                    id=invitation.word_id, user=invitation.host_user)
                Room.objects.create(host_user=invitation.host_user,
                                    guest_user=invitation.guest_user, word=word, activated=True)

        else:
            return {'message': 'Error response empty'}
