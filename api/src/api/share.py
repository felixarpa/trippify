from flask import jsonify

from src.nexmo import nexmo
from src.util import log


def get(phone_number):
    try:
        response = nexmo.send_message(phone_number)
        if response:
            return jsonify(error=False, message='Sent!'), 200
        else:
            return jsonify(error=True, message='Error while sending the message to {}.'.format(phone_number)), 400
    except Exception as e:
        log.error('Unexpected error in GET/share: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
