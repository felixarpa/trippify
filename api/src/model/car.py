import sqlalchemy as db

from sqlalchemy.orm import relationship
from src.db.sqlalchemy import Base

from src.model.participant import Participant


class Car(Base):
    __tablename__ = 'trippify_car'

    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('trippify_participant.id'), nullable=False)
    name = db.Column(db.String(50))
    model = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    available_seats = db.Column(db.Integer)
    participant = relationship(Participant.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            participant_id=self.participant_id,
            name=self.name,
            model=self.model,
            brand=self.brand,
            available_seats=self.available_seats,
            participant=self.participant.serialize()
        )
