from flask import Flask, jsonify, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo

import sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from Model import DBModel


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


@app.route('/journals_names/', methods=['GET'])
def get_all_journals_names():
    return jsonify(DBModel.get_all_journals_names()), 200


@app.route('/subject_areas/', methods=['GET'])
def get_all_subject_areas():
    return jsonify(DBModel.get_all_subject_areas()), 200


@app.route('/data_by_name/<name>', methods=['GET'])
def get_data_by_name(name):
    # here maybe will be saving data to DB
    return jsonify(DBModel.get_data_by_name(name)), 200


@app.route('/data_by_issn/<issn>', methods=['GET'])
def get_data_by_issn(issn):
    return jsonify(DBModel.get_data_by_issn(issn)), 200


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
