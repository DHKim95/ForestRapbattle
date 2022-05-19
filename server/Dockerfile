FROM python:3.7.9 

WORKDIR /usr/src/app

RUN mkdir wave_file

RUN apt-get update
RUN apt-get --yes install libsndfile1

COPY requirements.txt ./

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8443

# CMD ["python3", "manage.py", "makemigrations"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8443", "--noreload"]
