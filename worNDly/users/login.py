from django.urls import path
from . import views

urlpatterns = [
    path('', views.log_in, name='login'),
    path('success', views.success, name='success')
]