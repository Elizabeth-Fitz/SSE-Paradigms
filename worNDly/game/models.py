from django.db import models
from datetime import date
# Create your models here.

class Games(models.Model):
    user = models.CharField(max_length=200)
    wins = models.PositiveIntegerField()
    date = models.DateTimeField('date played')
    num_of_attempts = models.PositiveIntegerField()
