from flask import jsonify, request

from src.db.sqlalchemy import db_session
from src.model.participant import Participant
from src.model.trip import Trip
from src.model.car import Car
from src.util import log
from src.spotify import songs
from src.maps.algorithm import update_routes


def get(participant_id):
    try:
        participant = db_session().query(Participant).filter_by(id=participant_id).first()
        if participant:
            return jsonify(error=False, response=participant.serialize()), 200
        else:
            return jsonify(error=True, message='No participant found with {} as id.'.format(participant_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/participant: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def post():
    try:
        body = request.json
        required_parameters = ['trip_id', 'name', 'origin', 'music_genre']
        if not all(x in body for x in required_parameters):
            return jsonify(error=True, message='{} are required parameters.'.format(required_parameters)), 400

        trip = db_session().query(Trip).filter_by(id=body['trip_id']).first()
        if not trip:
            return jsonify(error=True, message='No trip found with {} as id'.format(body['trip_id'])), 400

        participant = Participant(
            trip_id=body['trip_id'],
            name=body['name'],
            origin=body['origin'],
            music_genre=body['music_genre']
        )
        db_session().add(participant)
        db_session().flush()

        if participant.id:
            car_parameters = ['car_name', 'car_brand', 'car_model', 'car_available_seats']
            if all(x in body and body[x] for x in car_parameters):
                car = Car(
                    participant_id=participant.id,
                    name=body['car_name'],
                    model=body['car_model'],
                    brand=body['car_brand'],
                    available_seats=body['car_available_seats']
                )
                db_session().add(car)
                db_session().flush()
                if not car.id:
                    return jsonify(error=True, message='Error while creating the new car.'), 400
            db_session().commit()

            update_routes(body['trip_id'])
            return jsonify(error=False, response=dict(participant_id=participant.id)), 200
        else:
            return jsonify(error=True, message='Error while creating the new participant.'), 400
    except Exception as e:
        log.error('Unexpected error in POST/participant: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def trip_get(trip_id):
    try:
        participants = db_session().query(Participant).filter_by(trip_id=trip_id).all()
        return jsonify(error=False, response=[participant.serialize() for participant in participants]), 200
    except Exception as e:
        log.error('Unexpected error in GET/participant/trip: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400


def playlist_get(participant_id):
    try:
        participant = db_session().query(Participant).filter_by(id=participant_id).first()
        if not participant:
            return jsonify(error=True, message='No participant found with {} as id.'.format(participant_id)), 400
        if participant.route_id:
            playlist = songs.get_album([participant.music_genre])
        else:
            genre_list = set()
            participants = db_session().query(Participant).filter_by(route_id=participant.route_id).all()
            for participant in participants:
                genre_list.add(participant.music_genre)
            playlist = songs.get_album(list(genre_list))
        if playlist:
            return jsonify(error=False, response=playlist), 200
        else:
            return jsonify(error=True, message='No playlist found.'), 400
    except Exception as e:
        log.error('Unexpected error in GET/participant/playlist: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
