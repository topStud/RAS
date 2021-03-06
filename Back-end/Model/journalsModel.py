import sys
from pyscopus import Scopus
key_1 = 'cb9ed59ab9261f2862d1dd86abd11df3'
key_2 = 'eff2bb99109d0d9f9af51c218b35e998'
scopus = Scopus(key_1)

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '..')))
from app import app, mongo


def get_all_journals_names():
    journals_names_collection = mongo.db.journals_names
    journals_names = journals_names_collection.distinct('name')
    return journals_names


def get_all_subject_areas():
    subject_areas_collection = mongo.db.subject_areas
    subject_areas = subject_areas_collection.distinct('name')
    return subject_areas


def get_data_by_name(name):
    try:
        meta_df, citescore_df, sj_rank_df = scopus.search_serial(name)
        return parsing_data(meta_df, citescore_df, sj_rank_df)
    except KeyError as e:
        print('journal not found')
        return "error"


def get_data_by_issn(issn):
    try:
        meta_df, citescore_df, sj_rank_df = scopus.retrieve_serial(issn)
        return parsing_data(meta_df, citescore_df, sj_rank_df)
    except KeyError as e:
        print('journal not found')
        return "error"


def parsing_data(meta_df, citescore_df, sj_rank_df):
    information = {}
    if meta_df.size != 0:
        # insert journal name
        information['name'] = meta_df['dc:title'][0]
        # insert journal issn ans e-issn
        try:
            information['issn'] = meta_df['prism:issn'][0]
        except:
            information['issn'] = "N/A"
            pass
        try:
            information['e-issn'] = meta_df['prism:eIssn'][0]
        except:
            information['e-issn'] = "N/A"
            pass

        # insert ranks by subject area
        num_of_subject_area = len(meta_df['subject-area'][0])
        # find subject area by code:
        scopus_subject_area_collection = mongo.db.scopus_subject_Area
        sa_code = {}  # dictionary of code:subject area name
        subject_area = []
        for code in meta_df['subject-area'][0]:
            query_result = scopus_subject_area_collection.find({"code": int(code)}, {"_id": 0, "subjectArea": 1})
            for x in query_result:
                subject_area.append(x['subjectArea'])
                sa_code[code] = x['subjectArea']

        information['subjectArea'] = subject_area
        if sj_rank_df.size != 0:
            lines = sj_rank_df.head(num_of_subject_area * 2).tail(num_of_subject_area)
            for num in range(num_of_subject_area, num_of_subject_area*2):
                information[sa_code[lines['subjectCode'][num]]] = lines['rank'][num]
        else:
            for sa in subject_area:
                information[sa] = "N/A"

    else:
        information['name'] = "N/A"
        information['issn'] = "N/A"
        information['subjectArea'] = "N/A"
    if citescore_df.size != 0:
        # insert the last cite score
        information['CiteScoreTracker'] = citescore_df.citeScore[0]
        # insert the previous cite score
        information['CiteScore'] = citescore_df.citeScore[1]
    else:
        information['CiteScoreTracker'] = "N/A"
        information['CiteScore'] = "N/A"

    return information
