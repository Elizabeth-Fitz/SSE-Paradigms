from django.urls import path
from . import views

app_name = 'users'

urlpatterns = [
    path('', views.log_in, name='login_root'),
    path('login/', views.log_in, name='login'),
    path('register/', views.sign_up, name='register'),
    path('success/', views.success, name='success'),
    path('logout/', views.log_out, name = 'logout')
]