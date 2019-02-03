from flask import jsonify

from src.db.sqlalchemy import db_session
from src.model.participant import Participant
from src.util import log


def get(participant_id):
    try:
        participant = db_session().query(Participant).filter_by(id=participant_id).first()
        if participant:
            if participant.route_id:
                origin = participant.origin
                destination = participant.trip.destination
                route_path = participant.route.route
                way_points_array = []
                for idx, stop in enumerate(route_path.split(',')):
                    participant = db_session().query(Participant).filter_by(id=stop).first()
                    if not idx:
                        origin = participant.origin
                    else:
                        way_points_array.append({'location': participant.origin})
                response = dict(
                    origin=origin,
                    destination=destination,
                    waypoints=way_points_array
                )
                return jsonify(error=False, response=response), 200
            else:
                return jsonify(error=True, message='No route found for this participant.'), 400
        else:
            return jsonify(error=True, message='No participant found with {} as id.'.format(participant_id)), 400
    except Exception as e:
        log.error('Unexpected error in GET/route: {}'.format(e))
        return jsonify(error=True, message='Unexpected error.'), 400
