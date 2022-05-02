DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'forest_1.0',
        # 'USER' : 'forest',
        # 'PASSWORD' : 'rapbattle',
        ###################
        # 로컬용
        'USER': 'root',
        'PASSWORD': '1234',
        #################
        # 서버에 올릴때 변경하기
        'HOST' : '127.0.0.1',
        'PORT' : '3306',
    }
}
SECRET_KEY = 'django-insecure-6o1lkec6!%)=lx1+3h_9(k+o#u&^1-l@obs4^76p%j8!m+w)ph'