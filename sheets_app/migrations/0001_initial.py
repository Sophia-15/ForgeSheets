# Generated by Django 5.0.3 on 2024-05-05 19:02

import django.core.validators
import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Race',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=75)),
                ('strength_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('intelligence_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('wisdom_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('charisma_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('constitution_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('speed_buff', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Sheet',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=75)),
                ('image', models.URLField(null=True)),
                ('race', models.CharField(max_length=75)),
                ('role', models.CharField(max_length=75)),
                ('strength', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('intelligence', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('wisdom', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('charisma', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('constitution', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('speed', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('healthPoint', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('healthPointMax', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('mana', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('manaMax', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('exp', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('expTotal', models.IntegerField(null=True, validators=[django.core.validators.MinValueValidator(0)])),
                ('expMax', models.IntegerField(default=100, validators=[django.core.validators.MinValueValidator(1)])),
                ('notes', models.TextField(default='')),
                ('description', models.TextField(default='NULL')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Magic',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=70)),
                ('description', models.CharField(max_length=200)),
                ('damage', models.CharField(default='', max_length=50)),
                ('atribute_modifier', models.CharField(max_length=15)),
                ('element', models.CharField(max_length=15)),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sheets_app.sheet')),
            ],
        ),
        migrations.CreateModel(
            name='Equipment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=55)),
                ('quantity', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('attack', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('defense', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sheets_app.sheet')),
            ],
        ),
    ]
