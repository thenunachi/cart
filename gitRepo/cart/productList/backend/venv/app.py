from flask import Flask,jsonify,request
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from models import db,bcrypt,User
from config import Config
from flask_cors import CORS

app = Flask(__name__) # create the Flask application object.
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
    token = create_access_token(identity=username)
    return jsonify(access_token=token), 200
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Dessert Shop"})

if __name__ == '__main__':
    app.run(debug=True,port=8000)
   