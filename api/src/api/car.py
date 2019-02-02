from flask import jsonify

from src.db.sqlalchemy import db_session
from src.model.car import Car
from src.util import log


def get(car_id):
    try:
        car = db_session().query(Car).filter_by(id=car_id).first()
        if car:
            return jsonify(error=False, response=car.serialize()), 200
        else:
            return jsonify(error=True, message='No car found with {} as id.'.format(car_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/car: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
