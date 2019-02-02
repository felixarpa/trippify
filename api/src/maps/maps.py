import googlemaps

from src import *


def create_client(api_key):
    return googlemaps.Client(key=api_key)


maps_geo_coding_client = create_client(MAPS_GEO_CODING_API_KEY)
