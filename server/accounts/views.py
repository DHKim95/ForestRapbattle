# from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

from .models import User
from game.models import ProfileImage
from .serializers import UserSerializer,UserInfoSerializer, ProfileImageSerializer
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request) :
  password = request.data.get('password')
  pw_confirmation = request.data.get('password2')

  # 비밀번호
  if password != pw_confirmation :
    return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
  
  serializer = UserSerializer(data=request.data)

  # 이메일 중복검사
  user_email = request.data.get('email')

  if get_user_model().objects.filter(email = user_email).exists() :
    return Response({'error': '이미 존재하는 Email입니다.'}, status=status.HTTP_400_BAD_REQUEST)

  if serializer.is_valid(raise_exception=True) :
    user = serializer.save()
    user.set_password(request.data.get('password'))
    user.save()
    return Response(serializer.data, status = status.HTTP_201_CREATED)
  return Response({'error':'회원가입실패'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def nickname(request) :
  curr_nickname = request.data.get('nickname')
  if get_user_model().objects.filter(nickname=curr_nickname).exists() :
    return Response({'result' : False}, status=status.HTTP_403_FORBIDDEN)
  else:
    return Response({'result' : True}, status=status.HTTP_200_OK)


@api_view(['GET'])
def login(request) :
  user = get_object_or_404(User,email=request.GET.get('email'))
  serializer = UserSerializer(user)
  return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def signout(request,user_id) :
  user_email = request.data.get('email')
  password = request.data.get('password')

  user = get_object_or_404(get_user_model(), user_id=user_id)
  if user :
    if user.email == user_email and check_password(password, user.password) :
      user.delete()
      return Response(status = status.HTTP_200_OK)
    return Response({'error' : '본인이 아닙니다.'},status = status.HTTP_401_UNAUTHORIZED)
  return Response({'error':'없는 유저입니다.'},status=status.HTTP_403_FORBIDDEN)

# 회원정보 조회
@api_view(['GET'])
def profile(request, user_id) :

  user = get_object_or_404(User, user_id=user_id)
  serializer = UserInfoSerializer(user)
  return Response(serializer.data, status=status.HTTP_200_OK)



# 프로필 사진
@api_view(['GET','PUT'])
def editProfile(request, user_id) :
  # 프로필 사진 조회
  if request.method == 'GET' :
    profileImages = get_list_or_404(ProfileImage)
    serializers = ProfileImageSerializer(profileImages, many=True)
    return Response(serializers.data, status=status.HTTP_200_OK)
  # 프로필 수정
  if request.method == 'PUT' :
    user = get_object_or_404(User, user_id=user_id)
    user.profile = request.data.get('profile_id')
    if request.user.id == user_id :
      user.save()
      return Response(status=status.HTTP_200_OK)
    return Response({'error':'본인이 아닙니다.'},status=status.HTTP_401_UNAUTHORIZED)
  