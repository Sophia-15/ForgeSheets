# Generated by Django 5.0.3 on 2024-04-17 19:04

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets_app', '0011_sheet_exptotal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Magic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=70)),
                ('description', models.CharField(max_length=200)),
                ('dice_type', models.CharField(max_length=15)),
                ('dice_quantity', models.IntegerField(max_length=15)),
                ('atribute_modifier', models.CharField(max_length=15)),
                ('element', models.CharField(max_length=15)),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sheets_app.sheet')),
            ],
        ),
    ]