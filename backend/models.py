from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__, static_folder="../build/static", template_folder="../build")
CORS(app)

#Francisco db connection line
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",
                                                       'postgresql://postgres:1234@localhost/coupons')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # to suppress a warning message
db = SQLAlchemy(app)

# # ------------
# # Users
# # ------------
class Coupon(db.Model):
    __tablename__ = 'coupon'

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    title = db.Column(db.String(500), nullable=False)
    desc = db.Column(db.Text, nullable=False)
    request_by = db.Column(db.String(500), nullable=True)
    requested_for = db.Column(db.DateTime, nullable=True)
    used = db.Column(db.Boolean, nullable=False)
