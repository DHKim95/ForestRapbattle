from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
  path('signup', views.signup),
  path('login', views.login),
  path('nickname', views.nickname), # 닉네임 중복검사용
  path('<int:user_id>', views.signout),
  path('<int:user_id>/profile',views.profile),
  path('<int:user_id>/editProfile', views.editProfile),
  path('api-token-auth/', obtain_jwt_token),
]
