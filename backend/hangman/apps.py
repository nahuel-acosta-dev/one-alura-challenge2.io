from django.apps import AppConfig


class HangmanConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'hangman'

    def ready(self):
        import hangman.signals
