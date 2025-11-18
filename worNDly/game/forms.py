
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Games
from django.forms import ModelForm

class GameForm(ModelForm):
    class Meta:
        model=Games
        fields =  '__all__'#['user','wins','date', 'num_of_attempts']#,#'password'] 
