from django.shortcuts import get_object_or_404, render
from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import User
from game.models import Match

from .serializers import MatchResultSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def AI(request) :
  audio_data = request.FILES.get('data') # 음성파일
  print(type(audio_data))
  print(audio_data.size)

  # AI 분석 코드 함수 




  serializer = {
    'similarity' : 100 # 유사도
  }
  return Response(serializer.data, status=status.HTTP_200_OK )



@api_view(['POST'])
@permission_classes([AllowAny])
def gameResult(request) :
  user_id = request.data.get('user_id')
  player1 = request.data.get('player1')
  player2 = request.data.get('player2')
  win = request.data.get('win')
  print(win)
  user = get_object_or_404(User, user_id=user_id)
  print(user.total_game_cnt)
  user.total_game_cnt += 1
  if user_id == player1 :
    if win == 'true' :
      data = { 'winner_user_id' : player1 , 'loser_user_id' : player2}
      user.win_cnt += 1
      user.win_point += 3
    else :
      data = { 'winner_user_id' : player2 , 'loser_user_id' : player1}
      user.lose_cnt += 1
      if user.win_point > 0 :
        user.win_point -= 1

  elif request.data.get('user_id') == player2:
    if win == 'true' :
      data = { 'winner_user_id' : player2 , 'loser_user_id' : player1}
      user.win_cnt += 1
      user.win_point += 3
    else :
      data = { 'winner_user_id' : player1 , 'loser_user_id' : player2}
      user.lose_cnt += 1
      if user.win_point > 0 :
        user.win_point -= 1
  
  user.save()
  
  serializer = MatchResultSerializer(data = data)
  if serializer.is_valid(raise_exception=True) :
    serializer.save(user=user)
    return Response({'created' : True}, status=status.HTTP_201_CREATED)
  return Response({'created' : False}, status=status.HTTP_404_NOT_FOUND)