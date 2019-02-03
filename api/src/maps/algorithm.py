from sqlalchemy import not_

from src.db.sqlalchemy import db_session
from src.maps import here
from src.model.car import Car
from src.model.participant import Participant
from src.util import log


def _compute_distances(trip_id):
    drivers = db_session().query(Participant).filter(
        Participant.trip_id == trip_id).filter(
        Participant.id == Car.participant_id).all()
    passengers = db_session().query(Participant).filter(
        Participant.trip_id == trip_id).filter(
        not_(Participant.id.in_([driver.id for driver in drivers]))).all()
    distances = {}
    for driver in drivers:
        distances[driver.id] = {driver.id: 0}
        origin_driver = driver.origin
        for passenger in passengers:
            origin_passenger = passenger.origin
            simple_route = here.request_simple_route(origin_driver, origin_passenger)
            if simple_route:
                d = simple_route.get('response', {}).get('route', [{}])[0].get('summary', {}).get('travelTime', -1)
                distances[driver.id][passenger.id] = d
            else:
                distances[driver.id][passenger.id] = -1
    return distances


def _sort_by_value(distances):
    for key in distances.keys():
        distances[key] = sorted(distances[key].items(), key=lambda kv: kv[1])
    return distances


def update_routes(trip_id):
    try:
        distances = _compute_distances(trip_id)
        distances = _sort_by_value(distances)
        return distances
    except Exception as e:
        log.error('Unexpected error updating routes: {}'.format(e))
        return None


if __name__ == '__main__':
    update_routes(1)
