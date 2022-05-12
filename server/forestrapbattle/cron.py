from game.views import ranking_save
from game.models import Words

def reset_ranking() :
  print('crontab 실행해줘~')
  instances = []
  instances.append(Words(word_id = 10, word_level = 10, word = '살려줘'))
  Words.objects.bulk_create(instances)
  ranking_save()