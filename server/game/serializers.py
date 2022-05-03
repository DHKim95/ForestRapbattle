from dataclasses import field
from pickletools import read_long1
from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.serializers import UserInfoSerializer
from game.models import Rank,Match


# 전체 랭킹 조회
class RankListSerializer(serializers.ModelSerializer) : 
  user = UserInfoSerializer(read_only = True)

  class Meta :
    model = Rank
    fields = '__all__'

# 게임 결과 저장
class MatchResultSerializer(serializers.ModelSerializer) :

  user = UserInfoSerializer(read_only=True)
  
  class Meta :
    model = Match
    fields = '__all__'

