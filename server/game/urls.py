from django.urls import path
from . import views

urlpatterns = [
  path('AI', views.AI),
  path('gameResult', views.gameResult),
  path('words',views.words),
  path('ranking', views.ranking),
  # path('test',views.ranking_save),
]