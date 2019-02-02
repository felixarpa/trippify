FROM python:3.6
ADD . /srv/trippify
WORKDIR /srv/trippify
RUN pip3 install -r requirements.txt
CMD uwsgi --ini trippify.ini