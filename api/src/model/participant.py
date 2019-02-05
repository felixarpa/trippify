import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.trip import Trip
from src.model.route import Route


class Participant(Base):
    __tablename__ = 'trippify_participant'

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trippify_trip.id'), nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('trippify_route.id'), nullable=True)
    name = db.Column(db.String(50))
    origin = db.Column(db.String(500))
    music_genre = db.Column(db.String(50))
    trip = relationship(Trip.__name__)
    route = relationship(Route.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            trip_id=self.trip_id,
            route_id=self.route_id,
            name=self.name,
            origin=self.origin,
            music_genre=self.music_genre,
            trip=self.trip.serialize(),
            route=None if not self.route else self.route.serialize()
        )
