from django.db import models
from game.models import ProfileImage
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    user_id = models.BigAutoField(primary_key=True)
    profile = models.ForeignKey(ProfileImage,on_delete=models.DO_NOTHING)
    email = models.EmailField(_('email address'), max_length=50,unique=True)
    nickname = models.CharField(max_length=16,unique=True)
    # password
    game_money = models.IntegerField(default = 0)
    total_game_cnt = models.IntegerField(default=0)
    win_cnt=models.IntegerField(default=0)
    lose_cnt=models.IntegerField(default=0)
    win_point=models.BigIntegerField(default=0)
    followers = models.ManyToManyField('self', symmetrical=False,related_name='followings')

    class Meta :
      db_table = 'user'