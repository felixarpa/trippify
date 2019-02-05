import requests

from src import *
from src.util import log


def get_coordinates(location):
    payload = {
        'app_id': HERE_APP_ID,
        'app_code': HERE_APP_CODE,
        'searchtext': location
    }
    response = requests.get(HERE_GEO_CODER_URL, params=payload)
    response_json = response.json()
    try:
        latitude = response_json['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude']
        longitude = response_json['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude']
        return dict(lat=latitude, lng=longitude)
    except Exception as e:
        log.error('Error getting latitude and longitude from Here response: {}'.format(e))
        return None
