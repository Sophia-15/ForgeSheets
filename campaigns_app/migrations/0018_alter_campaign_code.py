# Generated by Django 5.0.3 on 2024-05-29 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns_app', '0017_class_is_used_race_is_used_alter_campaign_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='code',
            field=models.CharField(default='kFkx73hS', editable=False, max_length=8, unique=True),
        ),
    ]
