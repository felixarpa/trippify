import nexmo

from src import *


nexmo_client = nexmo.Client(key=NEXMO_CLIENT_KEY, secret=NEXMO_CLIENT_SECRET)


def send_message(phone_number):
    response = nexmo_client.send_message({
        'from': NEXMO_FROM,
        'to': str(phone_number),
        'text': 'Join the Trippify family going to this trip! https://mytrippify.com/'
    })
    return int(response['message-count']) > 0
