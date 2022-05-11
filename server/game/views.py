from django.shortcuts import get_object_or_404, render
from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from accounts.models import User
from game.models import Match, Words, Rank

from .serializers import MatchResultSerializer
import random
import copy
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def AI(request) :
  audio_data = request.FILES.get('file') # 음성파일
  print(type(audio_data))
  print(audio_data.size)

  # AI 분석 코드 함수 




  serializer = {
    'similarity' : 100 # 유사도
  }
  return Response(serializer.get('similarity'), status=status.HTTP_200_OK )


@api_view(['GET'])
@permission_classes([AllowAny])
def words(request) :
  random_words_level = []
  all_words = Words.objects.all() # 모든단어들고오기
  
  words_serializers = []
  words = {
    'word_level' : 0,
    'word' :''
  }

  choice_method = random.randint(1,2)

  # 레벨 겹치지 않는 방법
  if choice_method == 1 : 

    idx = [(1,30),(31,60),(61,90),(91,120),(121,150)]
    tmp_idx_list =[]

    for i in range(5) : # 레벨별 랜덤 단어 1개
      tmp = random.randint(idx[i][0],idx[i][1])
      tmp_idx_list.append(tmp)
    idx_list = random.sample(tmp_idx_list,3)
    
    for j in idx_list : # 레벨 5개 중 3개 랜덤으로 고르기
      tmp_word = all_words.get(word_id=j)
      words['word_level'] = tmp_word.word_level
      words['word'] = tmp_word.word
      words_serializers.append(copy.deepcopy(words))

    return Response(words_serializers, status=status.HTTP_200_OK)

  # 그냥 랜덤
  else : 

    idx_list = random.sample(range(1,150), 3)

    for idx in idx_list :
      tmp_word = all_words.get(word_id=idx)
      words['word_level'] = tmp_word.word_level
      words['word'] = tmp_word.word
      words_serializers.append(copy.deepcopy(words))
    
    return Response(words_serializers, status=status.HTTP_200_OK)




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

# 랭킹 갱신
def ranking_save() :
  
  Rank.objects.all().delete()
  users = User.objects.all().order_by('-win_point')
  print(users)

  objs = [ Rank(rank=rank ,user_id=user) for rank,user in zip(range(1,len(users)+1),users)]
  print(objs)
  Rank.objects.bulk_create(objs)
  
