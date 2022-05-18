DATABASES = {
        'default': {
                'ENGINE': 'django.db.backends.mysql',
                'NAME': 'forest_1.0',
                # 로컬용
                'USER' : 'root',
                'PASSWORD' : 'donuts',
                'HOST' : '127.0.0.1',
                'PORT' : '3306',
                # 서버용
                # 'USER': 'root',
                # 'PASSWORD': 'forest',
                # 'HOST' : 'k6e204.p.ssafy.io',
                # 'PORT' : '3306',
        }
}
SECRET_KEY = 'django-insecure-6o1lkec6!%)=lx1+3h_9(k+o#u&^1-l@obs4^76p%j8!m+w)ph'