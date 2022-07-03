from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
from rest_framework import status


def access_user_data(request, pk):
    # se comprueba el token y se obtiene el id
    token = get_authorization_header(request).split()
    access_token_obj = AccessToken(token[1])
    user_id = access_token_obj['user_id']
    # Si el usuario que hace el llamado es el que esta registrado se le permite continuar
    if int(user_id) == int(pk):
        return True
    else:
        return Response({'error':
                         'You do not have the permissions to access this information'},
                        status=status.HTTP_401_UNAUTHORIZED)


def get_user_data(request):
    token = get_authorization_header(request).split()
    access_token_obj = AccessToken(token[1])
    user = access_token_obj['user_id']
    if user:
        return user
    else:
        return Response({'error':
                         'User not logged in'},
                        status=status.HTTP_401_UNAUTHORIZED)
