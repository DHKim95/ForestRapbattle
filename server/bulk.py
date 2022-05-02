import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'forestrapbattle.settings')
import django
django.setup()

import pandas as pd
from game.models import Words


df = pd.read_excel("./word.xlsx")

instances = []
for i in range(len(df)):
    word_id = df.iloc[i]['word_id']
    word_level = df.iloc[i]['word_level']
    word = df.iloc[i]['word']
    
    print(word_id, word_level, word)
    instances.append(Words(word_id = word_id, word_level = word_level, word = word))

Words.objects.bulk_create(instances)