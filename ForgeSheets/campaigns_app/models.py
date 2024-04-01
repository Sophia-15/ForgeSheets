from django.db import models
from django.contrib.auth.models import User

#adicionar código de compartilhamento depois
class Campaign(models.Model):
    image = models.URLField()
    title = models.CharField(max_length=75)
    description = models.TextField(default='')

    user = models.ForeignKey(User, on_delete=models.CASCADE)