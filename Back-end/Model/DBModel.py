import os
import sys

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from app import app, mongo


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

    return names
