from django.db import models
from django.conf import settings
from django.db.models.base import Model

# Create your models here.
class Words(models.Model) :
  word_id = models.AutoField(primary_key=True)
  word_level = models.SmallIntegerField()
  word = models.TextField()

  class Meta:
    db_table = 'words'

class Match(models.Model) :
  match_id = models.AutoField(primary_key=True)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  date = models.DateTimeField(auto_now_add=True)
  winner_user_id = models.BigIntegerField()
  loser_user_id = models.BigIntegerField()
  # match_user = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='user_match')
  
  class Meta:
    db_table = 'match'

class ProfileImage(models.Model) :
  profile_id = models.SmallAutoField(primary_key=True)
  profile_img = models.TextField() # 이미지 url 넣을 거임

  class Meta :
    db_table = 'profile_image'

class Rank(models.Model) :
  rank = models.IntegerField(primary_key=True) # id가 곧 순위
  user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)

  class Meta :
    db_table = 'rank'