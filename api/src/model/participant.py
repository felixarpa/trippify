import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.trip import Trip


class Participant(Base):
    __tablename__ = 'trippify_participant'

    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.Integer, db.ForeignKey('trippify_trip.id'), nullable=False)
    name = db.Column(db.String(50))
    origin = db.Column(db.String(500))
    music_genre = db.Column(db.String(50))
    trip = relationship(Trip.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            trip_id=self.trip_id,
            name=self.name,
            origin=self.origin,
            music_genre=self.music_genre,
            trip=self.trip.serialize()
        )
