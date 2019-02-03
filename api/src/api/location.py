from flask import jsonify

from src.util import log
from src.maps import maps, here


def verify_get(location):
    try:
        # maps_response = maps.get_coordinates(location)
        maps_response = here.get_coordinates(location)
        if maps_response:
            return jsonify(error=False, response=maps_response), 200
        else:
            return jsonify(error=True, message='Location not found.'), 400
    except Exception as e:
        log.error('Unexpected error in GET/location/verify: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
