from flask import jsonify

from src.db.sqlalchemy import db_session
from src.model.participant import Participant


def get(participant_id):
    participant = db_session().query(Participant).filter_by(id=participant_id).first()
    if participant:
        return jsonify(error=False, response=participant.serialize()), 200
    else:
        return jsonify(error=True, message='No participant found with {} as id.'.format(participant_id)), 200


def post():
    pass
