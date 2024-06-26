# Generated by Django 5.0.3 on 2024-05-20 19:05

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns_app', '0010_alter_campaign_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='code',
            field=models.CharField(default='EKemhznU', editable=False, max_length=8, unique=True),
        ),
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=75)),
                ('role', models.CharField(max_length=15)),
                ('campaign', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='campaigns_app.campaign')),
            ],
        ),
    ]
