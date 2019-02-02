from flask import jsonify

from src.db.sqlalchemy import db_session
from src.model.trip import Trip


def get(trip_id):
    trip = db_session().query(Trip).filter_by(id=trip_id).first()
    if trip:
        return jsonify(error=False, response=trip.serialize()), 200
    else:
        return jsonify(error=True, message='No trip found with {} as id.'.format(trip_id)), 200


def post():
    return jsonify(error=True, message='Functionality no available, yet.'), 200
