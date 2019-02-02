from flask import jsonify

from src.db.sqlalchemy import db_session
from src.model.car import Car


def get(car_id):
    car = db_session().query(Car).filter_by(id=car_id).first()
    if car:
        return jsonify(error=False, response=car.serialize()), 200
    else:
        return jsonify(error=True, message='No car found with {} as id.'.format(car_id)), 400
