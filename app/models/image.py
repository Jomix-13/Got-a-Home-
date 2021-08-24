from .db import db


class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(500), nullable=False)
    homeId = db.Column(db.Integer, db.ForeignKey('home.id'), nullable=False)

    home = db.relationship("Home", back_populates="images")

    def to_dict(self):
    return {
        'id': self.id,
        'imageUrl': self.imageUrl,
        'homeId': self.homeId,
    }