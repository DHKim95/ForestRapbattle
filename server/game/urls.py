from django.urls import path
from . import views

urlpatterns = [
  path('AI', views.AI),
  path('gameResult', views.gameResult),
]