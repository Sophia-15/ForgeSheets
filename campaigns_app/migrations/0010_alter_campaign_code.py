# Generated by Django 5.0.3 on 2024-05-20 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns_app', '0009_campaign_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='code',
            field=models.CharField(default='yUYeBuSL', editable=False, max_length=8, unique=True),
        ),
    ]
