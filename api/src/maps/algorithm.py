from src.db.sqlalchemy import db_session
from src.maps import here
from src.model.car import Car
from src.model.participant import Participant
from src.util import log


def _compute_distances():
    drivers = db_session().query(Participant).filter(Participant.id == Car.participant_id).all()
    passengers = db_session().query(Participant).filter(Participant.id != Car.participant_id).all()
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


def update_routes():
    try:
        distances = _compute_distances()
    except Exception as e:
        log.error('Unexpected error updating routes: {}'.format(e))
        return None


if __name__ == '__main__':
    update_routes()
