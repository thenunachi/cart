from flask import Flask,jsonify,request
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from models import db,bcrypt,User,Order
from config import Config
from flask_cors import CORS
import json
import os
import psycopg2






app = Flask(__name__) # create the Flask application object.
DATABASE_URL = os.environ.get("DATABASE_URL")
conn = psycopg2.connect(DATABASE_URL)
CORS(app)
app.config.from_object(Config) #load configuration settings (DB URI, JWT secret, etc.) into app.config from your Config class.

db.init_app(app)#bind the SQLAlchemy instance to the Flask app.
bcrypt.init_app(app)
jwt = JWTManager(app)

# Initialize database
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def singup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}),201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if not user or not user.check_password(password):
        return jsonify({"message": "Invalid creadentials"}),401
    token = create_access_token(identity=str(user.id),  # must be string or int
    additional_claims={"username": user.username})
    return jsonify(access_token=token, user_id=user.id, username=username), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    # print(data,"data")
    user_id = data.get('user_id')
    items = data.get('items')
    total = data.get('total')
    
    if not user_id or not items:
        return jsonify({"error": "Missing user_id or items"}),400
    
    new_order = Order(
        user_id = user_id,
        items = json.dumps(items),
        total = total
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"message": "Order created successfully", "order": new_order.to_dict()}), 201

# @app.route('/orders', methods=['GET'])
# @jwt_required()
# def get_user_orders():
#     username = get_jwt_identity()
#     user = User.query.filter_by(username=username).first()

#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     orders = Order.query.filter_by(user_id=user.id).order_by(Order.created_at.desc()).all()
#     print(orders,"orders")
#     return jsonify([order.to_dict() for order in orders])
@app.route('/orders', methods=['GET'])
@jwt_required()
def get_user_orders():
    user_id = int(get_jwt_identity())  # ✅ convert to int since identity is ID
    user = User.query.get(user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    orders = Order.query.filter_by(user_id=user.id).order_by(Order.created_at.desc()).all()
    return jsonify([order.to_dict() for order in orders])

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Dessert Shop"})

if __name__ == '__main__':
    app.run(debug=True,port=8000)
   