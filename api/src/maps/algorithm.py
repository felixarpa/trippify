import math

from sqlalchemy import not_

from src.db.sqlalchemy import db_session
from src.maps import here
from src.model.car import Car
from src.model.participant import Participant
from src.model.route import Route
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


def __set_group(groups, participant_dict, available_seats, participant_to_add):
    for part in participant_dict:
        driver_id = part[0]
        if len(groups[driver_id]) + 1 <= available_seats[driver_id] and part[1] != math.inf:
            groups[driver_id][participant_to_add] = part[1]
            return


def _group_by_driver(distances, trip_id):
    groups = {}
    for key in distances.keys():
        groups[key] = {}

    participants = db_session().query(Participant).filter(Participant.trip_id == trip_id).all()
    cars = db_session().query(Car).filter(
        Car.participant_id == Participant.id).filter(
        Participant.trip_id == trip_id).all()

    available_seats = {}
    for car in cars:
        available_seats[car.participant_id] = car.available_seats

    for participant in participants:
        participant_dict = {}
        for key, value in distances.items():
            participant_dict[key] = math.inf if participant.id not in value else value[participant.id]
        participant_dict = sorted(participant_dict.items(), key=lambda kv: kv[1])
        __set_group(groups, participant_dict, available_seats, participant.id)

    return groups


def _sort_by_value(groups):
    for key in groups.keys():
        groups[key] = sorted(groups[key].items(), key=lambda kv: kv[1])
    return groups


def _update_database(groups, trip_id):
    routes = db_session().query(Route).filter(
        Route.id == Participant.route_id).filter(
        Participant.trip_id == trip_id).all()
    for route in routes:
        db_session().delete(route)
    db_session().flush()

    for group in groups.values():
        route = Route(route=','.join([str(item[0]) for item in group]))
        db_session().add(route)
        db_session().flush()
        if route.id:
            for item in group:
                participant = db_session().query(Participant).filter_by(id=item[0]).first()
                if participant:
                    participant.route_id = route.id
                    db_session().flush()
    db_session().commit()


def update_routes(trip_id):
    try:
        distances = _compute_distances(trip_id)
        groups = _group_by_driver(distances, trip_id)
        groups = _sort_by_value(groups)
        _update_database(groups, trip_id)
        return groups
    except Exception as e:
        log.error('Unexpected error updating routes: {}'.format(e))
        return None


if __name__ == '__main__':
    update_routes(1)
