# Generated by Django 3.1.7 on 2021-03-31 13:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendors', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='vendor',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]