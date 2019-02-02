import sqlalchemy as db

from src.db.sqlalchemy import Base


class Trip(Base):
    __tablename__ = 'trippify_trip'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(500))
    destination = db.Column(db.String(500))
    currency = db.Column(db.String(10))

    def serialize(self):
        return dict(
            id=self.id,
            title=self.title,
            description=self.description,
            destination=self.destination,
            currency=self.currency
        )
