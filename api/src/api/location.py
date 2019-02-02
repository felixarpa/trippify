from flask import jsonify

from src.util import log


def verify_get(location):
    try:
        return jsonify(error=True, message='Functionality no available, yet.'), 200
    except Exception as e:
        log.error('Unexpected error in GET/location/verify: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
