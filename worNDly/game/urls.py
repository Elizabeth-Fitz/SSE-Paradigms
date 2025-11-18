from django.urls import path
from . import views

app_name = 'game'

urlpatterns = [
    path('', views.start, name='start'),
    path('start/', views.start, name='start'),
    path('worndly/', views.worndly, name='worndly'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('shop/', views.shop, name='shop'),
    path('shop/purchase/', views.purchase, name='purchase')
]