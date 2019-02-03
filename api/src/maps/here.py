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


def request_simple_route(first_way_point, second_way_point):
    first_way_point_coord = get_coordinates(first_way_point)
    second_way_point_coord = get_coordinates(second_way_point)
    payload = {
        'app_id': HERE_APP_ID,
        'app_code': HERE_APP_CODE,
        'waypoint0': 'geo!{},{}'.format(first_way_point_coord['lat'], first_way_point_coord['lng']),
        'waypoint1': 'geo!{},{}'.format(second_way_point_coord['lat'], second_way_point_coord['lng']),
        'mode': 'fastest;car;traffic:disabled'
    }
    response = requests.get(HERE_SIMPLE_ROUTE_URL, params=payload)
    if response.ok:
        response_json = response.json()
        return response_json
    else:
        return None
