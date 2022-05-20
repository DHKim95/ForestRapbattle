# from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password


from .models import User
from game.models import ProfileImage,Match
from .serializers import UserSerializer,UserInfoSerializer, ProfileImageSerializer, UserMatchResultSerializer

import copy

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request) :
  password = request.data.get('password')
  pw_confirmation = request.data.get('password2')

  # 비밀번호
  if password != pw_confirmation :
    return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)
  
  profile = get_object_or_404(ProfileImage, profile_id=request.data.get('profile_id'))
  serializer = UserSerializer(data=request.data)

  if serializer.is_valid(raise_exception=True) :
    user = serializer.save(profile=profile)
    user.set_password(request.data.get('password'))
    user.save()
    print(serializer.data)
    return Response(serializer.data, status = status.HTTP_201_CREATED)
  return Response({'error':'회원가입실패'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def email(request,email) :
  curr_email = email
  if get_user_model().objects.filter(email=curr_email).exists() :
    return Response({'result' : False}, status=status.HTTP_200_OK)
  else:
    return Response({'result' : True}, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([AllowAny])
def nickname(request,nickname) :
  curr_nickname = nickname
  if get_user_model().objects.filter(nickname=curr_nickname).exists() :
    return Response({'result' : False}, status=status.HTTP_200_OK)
  else:
    return Response({'result' : True}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request) :
  try :
    user = get_object_or_404(User,email=request.data.get('email'))
  except :
    return Response({'error' : '일치하는 아이디가 없습니다.'}, status=status.HTTP_400_BAD_REQUEST)
  if check_password(request.data.get('password'), user.password) :
    serializer = UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
  return Response({'error' : '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
# @permission_classes([AllowAny])
def signOut(request,user_id) :
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
@permission_classes([AllowAny])
def profile(request, user_id) :

  user = get_object_or_404(User, user_id=user_id)
  user_serializer = UserInfoSerializer(user)

  matches = Match.objects.filter(user_id=user_id).order_by('-date')
  match_serializers = UserMatchResultSerializer(matches, many=True)
  match_user_serializers = []

  tmp_match = {
    'match_id':0,
    'date' : '',
    'winner_user_id' : 0,
    'loser_user_id' : 0,
    'winner_info' : {},
    'loser_info' : {}
  }

  for i in range(len(matches)) :
    tmp_match['match_id'] = match_serializers.data[i]['match_id']
    tmp_match['date'] = match_serializers.data[i]['date']
    tmp_match['winner_user_id'] = match_serializers.data[i]['winner_user_id']
    tmp_match['loser_user_id'] = match_serializers.data[i]['loser_user_id']

    winner = get_object_or_404(User, user_id= match_serializers.data[i]['winner_user_id'])
    winner_serializer = UserInfoSerializer(winner)
    tmp_match['winner_info'] = winner_serializer.data

    loser = get_object_or_404(User, user_id= match_serializers.data[i]['loser_user_id'])
    loser_serializer = UserInfoSerializer(loser)
    tmp_match['loser_info'] = loser_serializer.data

    match_user_serializers.append(copy.deepcopy(tmp_match))

  serializer = {
    'user' : user_serializer.data,
    'match' : match_user_serializers
  }

  return Response(serializer, status=status.HTTP_200_OK)

# 프로필 사진 조회
@api_view(['GET'])
@permission_classes([AllowAny])
def ProfileImages(request) :
  profileImages = get_list_or_404(ProfileImage)
  serializers = ProfileImageSerializer(profileImages, many=True)
  return Response(serializers.data, status=status.HTTP_200_OK)


# 프로필 사진 수정
@api_view(['PUT'])
@permission_classes([AllowAny])
def editProfile(request, user_id,profile_id) :

  user = get_object_or_404(User, user_id=user_id)
  user.profile = get_object_or_404(ProfileImage, profile_id=profile_id)

  if request.user.user_id == user_id :
    user.save()
    serializer = UserSerializer(user)
    return Response(serializer.data,status=status.HTTP_200_OK)
  return Response({'error':'본인이 아닙니다.'},status=status.HTTP_401_UNAUTHORIZED)
  