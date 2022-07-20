import pytest
from hangman.models import User  

def test_user_creation():
    user = User.objects.create(
       username='cris',
       email='cris@example.com',
       password='cris00'
    )
    
    assert user.username == 'cris'