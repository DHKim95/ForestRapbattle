# Generated by Django 3.2.13 on 2022-05-03 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='win_point',
            field=models.BigIntegerField(default=30),
        ),
    ]