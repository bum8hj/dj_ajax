# Generated by Django 5.0.4 on 2024-04-05 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='avatar.png', upload_to='avatars/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True),
        ),
    ]
