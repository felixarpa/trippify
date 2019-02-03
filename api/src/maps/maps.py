import googlemaps

from src import *


def __create_client(api_key):
    return googlemaps.Client(key=api_key)


def get_coordinates(location):
    response = maps_geo_coding_client.geocode(location)
    if 'geometry' in response and 'location' in response['geometry']:
        return response['geometry']['location']
    return None


maps_geo_coding_client = __create_client(MAPS_GEO_CODING_API_KEY)
