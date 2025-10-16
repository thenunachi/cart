from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import json
from datetime import datetime

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    items = db.Column(db.Text,nullable=False)
    total = db.Column(db.Integer,nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user = db.relationship('User', backref=db.backref('orders', lazy=True))
    def to_dict(self):
        return{
            "id":self.id,
            "user_id": self.user_id,
            "items" : json.loads(self.items),
            "total" : self.total,
            "created_at": self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }