import sys
from pyscopus import Scopus
key_1 = 'cb9ed59ab9261f2862d1dd86abd11df3'
key_2 = 'eff2bb99109d0d9f9af51c218b35e998'
scopus = Scopus(key_1)

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from app import app, mongo


def get_publication_journals(first_name, last_name):
    author_result_df = scopus.search_author("AUTHLASTNAME(" + last_name +") and AUTHFIRST(" + first_name + ")")
    author_pub_df = scopus.search_author_publication(author_result_df['author_id'][0])
    journal_list = list(set(author_pub_df['publication_name']))
    return journal_list
