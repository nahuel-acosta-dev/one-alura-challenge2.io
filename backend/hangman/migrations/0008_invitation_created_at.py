# Generated by Django 4.0.4 on 2022-07-02 23:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('hangman', '0007_alter_invitation_response'),
    ]

    operations = [
        migrations.AddField(
            model_name='invitation',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]