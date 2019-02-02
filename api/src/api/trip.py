from flask import jsonify, request

from src.db.sqlalchemy import db_session
from src.model.trip import Trip


def get(trip_id):
    trip = db_session().query(Trip).filter_by(id=trip_id).first()
    if trip:
        return jsonify(error=False, response=trip.serialize()), 200
    else:
        return jsonify(error=True, message='No trip found with {} as id.'.format(trip_id)), 400


def post():
    body = request.json
    required_parameters = ['title', 'description', 'destination', 'currency']
    if not all(x in body for x in required_parameters):
        return jsonify(error=True, message='{} are required parameters.'.format(required_parameters)), 400

    trip = Trip(
        title=body['title'],
        description=body['description'],
        destination=body['destination'],
        currency=body['currency']
    )
    db_session().add(trip)
    db_session().commit()

    if trip.id:
        return jsonify(error=False, response=dict(trip_id=trip.id)), 200
    else:
        return jsonify(error=True, message='Error while creating the new trip.'), 400
