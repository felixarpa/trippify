import time
import requests

from src import *


__data = {
    'expires': 0,
    'bearer_token': ''
}


def get_bearer_token():
    if __data['expires'] < time.time():
        __data['bearer_token'] = get_access_token()
    return __data['bearer_token']


def get_access_token():
    headers = {'Authorization': 'Basic {}'.format(SPOTIFY_API_AUTH)}
    data = {'grant_type': 'client_credentials'}
    response = requests.post(SPOTIFY_API_LOGIN, data=data, headers=headers)
    if response.status_code == 200:
        __data['expires'] = time.time() + response.json()['expires_in'] * 1000
        return response.json()['access_token']
    else:
        return ''
