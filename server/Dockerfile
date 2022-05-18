FROM python:3.7.9 

RUN apt-get update
RUN apt-get -y install cron

RUN touch /var/log/cron.log

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . .
RUN service cron start
RUN service cron status
RUN python manage.py crontab add

EXPOSE 8443

# CMD ["python3", "manage.py", "makemigrations"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8443", "--noreload"]
