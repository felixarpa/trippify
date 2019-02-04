FROM python:3.6
ADD . /srv/trippify
WORKDIR /srv/trippify
RUN pip3 install -r requirements.txt
RUN sed -i 's/localhost/trippify-db/g' /srv/trippify/src/__init__.py
CMD uwsgi --ini trippify.ini