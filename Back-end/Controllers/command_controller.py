from flask import Flask, jsonify, redirect, url_for
from flask_cors import CORS
from flask_pymongo import PyMongo

PORT = 5000
app = Flask(__name__, static_folder='../../Front-end')
CORS(app)
app.config['MONGO_DBNAME'] = 'RAS_DB'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/RAS_DB'

mongo = PyMongo(app)


@app.route('/')
def index():
    return redirect(url_for('static', filename='index.html'))


@app.route('/journals_names', methods=['GET'])
def get_all_journals_names():
    wos_names_collection = mongo.db.WOS_journal_names
    names = []
    # take a union of journals names without repetitions
    journals_names = wos_names_collection.aggregate([
            {'$project': {'name': 1}},
            {'$unionWith': {'coll': "scopus_Journal_names", 'pipeline': [{'$project': {'name': 1}}]}},
            {'$group': {'_id': "$name"}}])

    for x in journals_names:
        names.append(x['_id'])

    return jsonify(names), 200


if __name__ == '__main__':
    app.run(debug=True, port=PORT)
