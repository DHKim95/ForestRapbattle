import profile
from django.shortcuts import get_object_or_404, render
from rest_framework import serializers, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from accounts.models import User
from game.models import Match, Words, Rank,ProfileImage

from accounts.serializers import ProfileImageSerializer
from .serializers import MatchResultSerializer,RankSerializer
import random
import copy
import kospeech_latest.asr_metrics as metrics
# from kospeech_latest.bin import inference
from jamo import h2j, j2hcj
import Levenshtein as Lev
from pydub import AudioSegment
import json
import os
import librosa
import soundfile as sf
# Create your views here.

# cer, wer 함수
def wer(hyp, ref):
    ref = j2hcj(h2j(ref))
    hyp = j2hcj(h2j(hyp))

    print("단어", ref)
    hyp = ''.join(hyp)[2:-3]
    print("두번째 단어", hyp)

    r = []
    h = []
    if len(ref) < len(hyp):
      for i in ref:
        h.append(i)
      for i in hyp:
        r.append(i)
    else:
      for i in ref:
        r.append(i)
      for i in hyp:
        h.append(i)

    print("리스트 보기")
    print(r)
    print(h)
    print("리스트보기 끝")

    costs = [[0 for _ in range(len(h)+1)] for _ in range(len(r)+1)]
    backtrace = [[0 for _ in range(len(h)+1)] for _ in range(len(r)+1)]

    OP_OK = 0
    OP_SUB = 1
    OP_INS = 2
    OP_DEL = 3

    DEL_PENALTY=1
    INS_PENALTY=1
    SUB_PENALTY=1

    for i in range(1, len(r)+1):
        costs[i][0] = DEL_PENALTY*i
        backtrace[i][0] = OP_DEL

    for j in range(1, len(h) + 1):
        costs[0][j] = INS_PENALTY * j
        backtrace[0][j] = OP_INS

    for i in range(1, len(r)+1):
        for j in range(1, len(h)+1):
            if r[i-1] == h[j-1]:
                costs[i][j] = costs[i-1][j-1]
                backtrace[i][j] = OP_OK
            else:
                substitutionCost = costs[i-1][j-1] + SUB_PENALTY
                insertionCost    = costs[i][j-1] + INS_PENALTY 
                deletionCost     = costs[i-1][j] + DEL_PENALTY 

                costs[i][j] = min(substitutionCost, insertionCost, deletionCost)
                if costs[i][j] == substitutionCost:
                    backtrace[i][j] = OP_SUB
                elif costs[i][j] == insertionCost:
                    backtrace[i][j] = OP_INS
                else:
                    backtrace[i][j] = OP_DEL

    i = len(r)
    j = len(h)
    numSub = 0
    numDel = 0
    numIns = 0
    numCor = 0
    while i > 0 or j > 0:
        if backtrace[i][j] == OP_OK:
            numCor += 1
            i-=1
            j-=1
        elif backtrace[i][j] == OP_SUB:
            numSub +=1
            i-=1
            j-=1
        elif backtrace[i][j] == OP_INS:
            numIns += 1
            j-=1
        elif backtrace[i][j] == OP_DEL:
            numDel += 1
            i-=1
    return ((numSub + numDel + numIns) / (float) (len(r)))
    

def cer(ref, hyp):
    ref = ref.replace(' ', '')
    hyp = hyp.replace(' ', '')
    dist = Lev.distance(hyp, ref)
    length = len(ref)
    return dist, length, dist/length

############################################

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def AI(request) :
  audio_data = request.FILES.get('file') # 음성파일
  # print(type(audio_data))
  # print(audio_data.size)
  words = request.POST.get('text') # 단어
  # print(type(words))
  # print(words)
  file_id = request.POST.get('uid')

  # print("현재 경로는", os.getcwd())
  # os.chdir(r'C:\Users\SSAFY\Desktop\SSAFY\자율\S06P31E204\server')
  os.chdir(r'/usr/src/app/')

  # print("경로바꾸기끝")
  # print("사운드 저장시작")
  sound = AudioSegment.from_wav(audio_data)
  sound = sound.set_channels(1)
  # sound.export(f"C:/Users/SSAFY/Desktop/SSAFY/자율/S06P31E204/server/game/wave/{file_id}.wav", format="wav")
  sound.export(f"/usr/src/app/wave_file/{file_id}.wav", format="wav")
  # print("사운드 저장 끝")
  
  
  sr = 44100
  # y, sr = librosa.load(f'C:/Users/SSAFY/Desktop/SSAFY/자율/S06P31E204/server/game/wave/{file_id}.wav', sr=sr)
  y, sr = librosa.load(f'/usr/src/app/wave_file/{file_id}.wav', sr=sr)
  print("안올거같은데", y, sr)
  half = len(y) / 10
  y2 = y[:round(half)]
  
  # sf.write(f'C:/Users/SSAFY/Desktop/SSAFY/자율/S06P31E204/server/game/wave/{file_id}.wav', y2, sr, 'PCM_24')
  sf.write(f'/usr/src/app/wave_file/{file_id}.wav', y2, sr, 'PCM_24')

  # AI 분석 코드 함수 
  print("출발?")
  print(os.getcwd())
  # os.chdir(r'C:\Users\SSAFY\Desktop\SSAFY\자율\S06P31E204\server\kospeech_latest')
  os.chdir(r'/usr/src/app/kospeech_latest')

  print(os.getcwd())
  print(os.listdir())
  # input_text = os.popen(f'python ./bin/inference.py --model_path "C:/Users/SSAFY/Desktop/SSAFY/자율/S06P31E204/server/kospeech_latest/outputs/train_model/10-37-48/model.pt" --audio_path "C:/Users/SSAFY/Desktop/SSAFY/자율/S06P31E204/server/game/wave/{file_id}.wav" --device "cpu"')
  input_text = os.popen(f'python ./bin/inference.py --model_path "/usr/src/app/kospeech_latest/outputs/train_model/10-37-48/model.pt" --audio_path "/usr/src/app/wave_file/{file_id}.wav" --device "cpu"')
  voice_text = input_text.read()
  print("입력된 함수", voice_text)
  # input_text = '경찰청창살'
  
  score_lst = []
  words = json.loads(words)
  for word in words:
    level = word['word_level']
    print("주어진 단어", word['word'])
    # a = wer(voice_text, word['word'])
    # print("이건", a)
    # 단어 길이 비교

    score = 1 - wer(voice_text, word['word'])
    print(score)

    score_lst.append((level, score))
  score_lst.sort(key=lambda x: (x[1], x[0]), reverse=True)
  print("리스트", score_lst)
  ans = score_lst[0][1]
  print("가장높은점수",ans)
    
  # [cer1, substitutions, deletions, insertions] = metrics.get_cer(word, input_text)
  # [wer1, substitutions, deletions, insertions] = metrics.get_wer(word, input_text)
  # ans = 1 -cer1
    
  if ans >= 0.75:
      serializer = {
        'level': score_lst[0][0],
        'similarity' : 100 # 유사도
      }
  elif ans >=0.55:
      serializer = {
        'level': score_lst[0][0],
        'similarity' : 80 # 유사도
      }
  elif ans >= 0.35:
      serializer = {
        'level': score_lst[0][0],
        'similarity' : 50 # 유사도
      }
  else:
      serializer = {
        'level': score_lst[0][0],
        'similarity' : 10 # 유사도
      }
  # print(inference)
  print("최종", serializer)

  print("삭제시작?")

  return Response(serializer)
  # return Response(serializer.data, status=status.HTTP_200_OK )



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
    idx_list.sort()
    
    for j in idx_list : # 레벨 5개 중 3개 랜덤으로 고르기
      tmp_word = all_words.get(word_id=j)
      words['word_level'] = tmp_word.word_level
      words['word'] = tmp_word.word
      words_serializers.append(copy.deepcopy(words))

    return Response(words_serializers, status=status.HTTP_200_OK)

  # 그냥 랜덤
  else : 

    idx_list = random.sample(range(1,150), 3)
    idx_list.sort()
    for idx in idx_list :
      tmp_word = all_words.get(word_id=idx)
      words['word_level'] = tmp_word.word_level
      words['word'] = tmp_word.word
      words_serializers.append(copy.deepcopy(words))
    
    return Response(words_serializers, status=status.HTTP_200_OK)

@api_view(['POST'])
# @permission_classes([AllowAny])
def gameResult(request) :
  user_id = request.data.get('user_id')
  player1 = request.data.get('player1')
  player2 = request.data.get('player2')
  win = request.data.get('win')
  # print(win)
  user = get_object_or_404(User, user_id=user_id)
  # print(user.total_game_cnt)
  user.total_game_cnt += 1
  if user_id == player1 :
    if win == 'true' :
      data = { 'winner_user_id' : player1 , 'loser_user_id' : player2}
      user.win_cnt += 1
      user.win_point += 30
    else :
      data = { 'winner_user_id' : player2 , 'loser_user_id' : player1}
      user.lose_cnt += 1
      if user.win_point >= 20 :
        user.win_point -= 20

  elif request.data.get('user_id') == player2:
    if win == 'true' :
      data = { 'winner_user_id' : player2 , 'loser_user_id' : player1}
      user.win_cnt += 1
      user.win_point += 30
    else :
      data = { 'winner_user_id' : player1 , 'loser_user_id' : player2}
      user.lose_cnt += 1
      if user.win_point >= 20 :
        user.win_point -= 20
  
  user.save()
  
  serializer = MatchResultSerializer(data = data)
  if serializer.is_valid(raise_exception=True) :
    serializer.save(user=user)
    return Response({'created' : True}, status=status.HTTP_201_CREATED)
  return Response({'created' : False}, status=status.HTTP_404_NOT_FOUND)


#랭킹
@api_view(['GET'])
@permission_classes([AllowAny])
def ranking(request) :
  
  # 랭크 갱신
  Rank.objects.all().delete()
  users = User.objects.all().order_by('-win_point')
  # print(users)

  objs = [ Rank(rank=rank ,user_id=user) for rank,user in zip(range(1,len(users)+1),users)]
  # print(objs)
  Rank.objects.bulk_create(objs)

  page = request.GET.get('page')
  rank_cnt = Rank.objects.all().count()
  # print(rank_cnt)
  if page == None or page=='1' :
    page = 1
    page_size = 18
    limit = int(page_size*page)
    offset = int(limit-page_size)
    ranking_uids = Rank.objects.all().order_by('rank')[offset:limit]
    # print(offset,limit)
  else :
    page = int(page)
    page_size = 15
    limit = (int(page_size*page))
    offset = int(limit-page_size)+3
    ranking_uids = Rank.objects.all().order_by('rank')[offset:limit+3]
    # print(offset,limit+4)
  
  ranking_serializers = RankSerializer(ranking_uids, many=True)

  data = []
  rank_user_info = {
    'rank' : 0,
    'user_id' : 0,
    'nickname' : '',
    'win_cnt' : 0,
    'lose_cnt' : 0,
    'win_point' : 0,
    'profile':{}
  }

  for i in range(len(ranking_uids)) :
    rank_user_info['rank'] = ranking_serializers.data[i]['rank']
    rank_user_info['user_id'] = ranking_serializers.data[i]['user_id']
    user_info = User.objects.get(user_id=ranking_serializers.data[i]['user_id'])
    rank_user_info['nickname'] = user_info.nickname
    rank_user_info['win_cnt'] = user_info.win_cnt
    rank_user_info['lose_cnt'] = user_info.lose_cnt
    rank_user_info['win_point'] = user_info.win_point
    profile_serializer = ProfileImageSerializer(user_info.profile)
    rank_user_info['profile'] = profile_serializer.data

    data.append(copy.deepcopy(rank_user_info))
  serializer = {
    'rank_total_cnt' : rank_cnt,
    'data' : data
  }
  return Response(serializer, status=status.HTTP_200_OK)

# 랭킹 갱신
@api_view(['GET'])
@permission_classes([AllowAny])
def ranking_save() :
  
  # instances = []
  # instances.append(Words(word_id = 10, word_level = 10, word = 'save'))
  # Words.objects.bulk_create(instances)

  Rank.objects.all().delete()
  users = User.objects.all().order_by('-win_point')
  # print(users)

  objs = [ Rank(rank=rank ,user_id=user) for rank,user in zip(range(1,len(users)+1),users)]
  # print(objs)
  Rank.objects.bulk_create(objs)
