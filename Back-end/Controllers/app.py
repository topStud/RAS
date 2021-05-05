import json
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
    if DBModel.get_data_by_name(name) == "error":
        return 'journal not found', 404
    return jsonify(DBModel.get_data_by_name(name)), 200


@app.route('/data_by_issn/<issn>', methods=['GET'])
def get_data_by_issn(issn):
    if DBModel.get_data_by_issn(issn) == "error":
        return 'journal not found', 404
    return jsonify(DBModel.get_data_by_issn(issn)), 200


@app.route('/data_by_name_list/<names_list>', methods=['GET'])
def get_data_by_name_list(names_list):
    # convert string to list
    names_list = json.loads(names_list)
    data_list = []
    for name in names_list:
        # get the data of that journal
        data_dict = DBModel.get_data_by_name(name)
        if data_dict == "error":
            continue
        data_list.append(data_dict)
    if len(data_list) == 0:
        return 'journal not found', 404
    return jsonify(data_list), 200


@app.route('/data_by_issn_list/<issn_list>', methods=['GET'])
def get_data_by_issn_list(issn_list):
    # convert string to list
    issn_list = json.loads(issn_list)
    data_dict = {}  # journal name: dict of data
    for issn in issn_list:
        # get the data of that issn
        dict = DBModel.get_data_by_issn(issn)
        if dict == "error":
            continue
        data_dict[dict['name']] = dict
    if len(data_dict) == 0:
        return 'journal not found', 404

    # convert the data dictionary to list of data
    data_list = list(data_dict.values())
    return jsonify(data_list), 200


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
