from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from game.models import Words, Match, ProfileImage,Rank
# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Words)
admin.site.register(Match)
admin.site.register(ProfileImage)
admin.site.register(Rank)