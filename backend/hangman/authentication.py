from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.tokens import AccessToken


def get_token_data(request, pk):
    token = get_authorization_header(request).split()
    access_token_obj = AccessToken(token[1])
    user_id = access_token_obj['user_id']
    print(user_id)
    if user_id == pk:
        return user_id
    else:
        return False
