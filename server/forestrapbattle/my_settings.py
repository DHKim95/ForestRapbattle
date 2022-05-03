DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'forest_1.0',
        # 'USER' : 'forest',
        # 'PASSWORD' : 'rapbattle',
        # 'HOST' : '127.0.0.1',
        ###################
        'USER': 'root',
        'PASSWORD': 'forest',
        # 'PASSWORD': 'root',
        #################
        # 서버에 올릴때 변경하기
        'HOST' : 'k6e204.p.ssafy.io',
        'PORT' : '3306',
    }
}
SECRET_KEY = 'django-insecure-6o1lkec6!%)=lx1+3h_9(k+o#u&^1-l@obs4^76p%j8!m+w)ph'