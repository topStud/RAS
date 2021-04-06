from flask import Flask, jsonify, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo
# Routes
from routes import *

PORT = 5000
app = Flask(__name__, static_folder='../../Front-end')
CORS(app)
# DataBase
app.config['MONGO_DBNAME'] = 'RAS_DB'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/RAS_DB'
mongo = PyMongo(app)


@app.route('/')
def index():
    return redirect(url_for('static', filename='index.html'))


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
