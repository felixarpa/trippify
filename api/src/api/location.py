from flask import jsonify

from src.util import log
from src.maps import geocoding


def verify_get(location):
    try:
        maps_response = geocoding.get_coordinates(location)
        if maps_response:
            return jsonify(error=True, response=maps_response), 200
        else:
            return jsonify(error=True, message='Location not found.'), 200
    except Exception as e:
        log.error('Unexpected error in GET/location/verify: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
