# Generated by Django 5.0.4 on 2024-04-06 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_alter_profile_avatar_alter_profile_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='avatar.jpg', upload_to='avatars/'),
        ),
    ]
