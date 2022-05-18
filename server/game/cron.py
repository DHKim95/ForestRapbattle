from asyncio.log import logger
logger.info("함수 밖 / 위")
from .views import ranking_save
from .models import Words

logger.info("함수 밖 / 아래")

def reset_ranking() :
  print('crontab 실행해줘~')
  instances = []
  instances.append(Words(word_id = 10, word_level = 10, word = '살려줘'))
  Words.objects.bulk_create(instances)
  ranking_save()

reset_ranking()