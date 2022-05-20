from django.contrib.auth.models import AbstractUser, BaseUserManager

from django.db import models
from game.models import ProfileImage
# from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    user_id = models.BigAutoField(primary_key=True)
    profile = models.ForeignKey(ProfileImage,on_delete=models.DO_NOTHING, null=True) # table에서는 profile_id 이다.
    username = None
    email = models.EmailField(_('email address'), max_length=50,unique=True)
    # email = models.CharField(max_length=50, unique=True)
    nickname = models.CharField(max_length=8,unique=True)
    # password
    game_money = models.IntegerField(default = 0)
    total_game_cnt = models.IntegerField(default=0)
    win_cnt=models.IntegerField(default=0)
    lose_cnt=models.IntegerField(default=0)
    win_point=models.BigIntegerField(default=1000)
    followers = models.ManyToManyField('self', symmetrical=False,related_name='followings')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()
    
    class Meta :
        db_table = 'user'