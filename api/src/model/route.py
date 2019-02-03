import sqlalchemy as db

from src.db.sqlalchemy import Base


class Route(Base):
    __tablename__ = 'trippify_route'

    id = db.Column(db.Integer, primary_key=True)
    route = db.Column(db.String(500))

    def serialize(self):
        return dict(
            id=self.id,
            route=self.route
        )
