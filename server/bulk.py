import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'forestrapbattle.settings')
import django
django.setup()

import pandas as pd
from game.models import Words,ProfileImage


df = pd.read_excel("./word.xlsx")

instances = []
for i in range(len(df)):
    word_id = df.iloc[i]['word_id']
    word_level = df.iloc[i]['word_level']
    word = df.iloc[i]['word']
    
    print(word_id, word_level, word)
    instances.append(Words(word_id = word_id, word_level = word_level, word = word))

Words.objects.bulk_create(instances)

df2 = pd.read_excel("./Profile_URL.xlsx")

instances2 = []
for i in range(len(df2)) :
    profile_img = df2.iloc[i]['profile_img_url']
    print(profile_img)
    instances2.append(ProfileImage(profile_img=profile_img))

ProfileImage.objects.bulk_create(instances2)
