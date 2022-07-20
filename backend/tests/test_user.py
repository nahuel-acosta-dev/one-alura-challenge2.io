import pytest
from hangman.models import User


@pytest.mark.django_db
def test_user_creation():
    user = User.objects.create(
        username='cris',
        email='cris@example.com',
        password='cris00'
    )

    assert user.username == 'cris'


@pytest.mark.django_db
def test_superuser_creation():
    user = User.objects.create_superuser(
        username='chris',
        email='chris@example.com',
        password='chris00'
    )

    assert user.is_superuser
