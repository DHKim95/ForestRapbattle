from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
  path('signup', views.signup),
  path('login', views.login),
  path('<str:nickname>/nickname', views.nickname), # 닉네임 중복검사용
  path('<str:email>/email', views.email), # 메일 중복검사용
  path('<int:user_id>/signOut', views.signOut),
  path('profileImages',views.ProfileImages), # 프로필이미지 제공
  path('<int:user_id>/<int:profile_id>/editProfile', views.editProfile), # 프로필 이미지 수정
  path('<int:user_id>/profile',views.profile), # 개인 회원정보
  path('api-token-auth/', obtain_jwt_token),
]
