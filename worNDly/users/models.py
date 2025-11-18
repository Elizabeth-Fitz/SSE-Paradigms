from django.db import models
from django.contrib.auth.models import User

class Games(models.Model):
    user = models.CharField(max_length=200)
    wins = models.PositiveIntegerField()
    date = models.DateTimeField('date played')
    num_of_attempts = models.PositiveIntegerField()

