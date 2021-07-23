from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient

from elsapy.elsclient import ElsClient
from elsapy.elssearch import ElsSearch
import json
import os
import re

# from Bio import Entrez

# constants
IP = 'localhost'
PORT = 27017


def main():
    # create new DB
    client = MongoClient(IP, PORT)
    sa_db = client.SA_DB
    # connecting to RAS DB
    ras_db = client.RAS_DB
    # create mapping: WOS subject area --> collection name
    WOS_map = create_mapping(ras_db)
    # Every month:
    update(sa_db, ras_db, WOS_map)


def update(sa_db, ras_db, WOS_map):
    erase_perv_collections(sa_db, ras_db)
    map = create_collections_map(ras_db)
    # filling by scopus
    scopus_fill_map(map, ras_db)
    # filling by WOS
    WOS_fill_map(map, ras_db, WOS_map)
    fill_collections_by_map(sa_db, map)


#צריך לתקן- לשלוח את המפה שך שמות הקולשנים ואז רק למחוק (לפי המפה)
def erase_perv_collections(sa_db, ras_db):
    # take collection's name
    subject_areas_collection = ras_db.subject_areas
    subject_areas_list = subject_areas_collection.distinct('name')
    for name in subject_areas_list:
        collection = sa_db[name]
        collection.drop()


def create_collections_map(ras_db):
    # take the subject areas collection
    subject_areas_collection = ras_db.subject_areas
    subject_areas_list = subject_areas_collection.distinct('name')
    # create dictionary: collection name --> set (set of journals names)
    journals_of_collection = {}
    # create collections by subject area names
    for sa in subject_areas_list:
        # if subject area's name contains the word 'general'
        if sa.find('General') != -1 and sa != 'General & Internal Medicine' and sa != 'General Health Professions':
            sa = sa[8:] + ' (all)'
        if sa == 'General Health Professions':
            sa = sa[8:] + '  (all)'
        # add collection to dict
        journals_of_collection[sa] = set()
    return journals_of_collection


def scopus_fill_map(map, ras_db):
    # create map sa name --> tokens of sa name
    sa_to_tokens = create_tokens_of_sa(ras_db)

    # Load configuration
    con_file = open("config.json")
    config = json.load(con_file)
    con_file.close()

    # Initialize client
    client = ElsClient(config['apikey'], num_res=500)
    client.inst_token = config['insttoken']

    # list of subject:
    subjects = ['AGRI', 'ARTS', 'BIOC', 'BUSI', 'CENG', 'CHEM', 'COMP', 'DECI', 'DENT', 'EART',
                'ECON', 'ENER', 'ENGI', 'ENVI', 'HEAL', 'IMMU', 'MATE', 'MATH', 'MEDI', 'NEUR',
                'NURS', 'PHAR', 'PHYS', 'PSYC', 'SOCI', 'VETE', 'MULT']
    for subject in subjects:
        test_search = ElsSearch('subj='+subject, 'title')
        test_search.execute(client, get_all=True)
        # Opening JSON file
        f = open('dump.json', )
        # returns JSON object a dictionary
        data = json.load(f)
        # Iterating through the json list
        for item in data:
            title = item['dc:title']
            for i in item['subject-area']:
                if i['@abbrev'] == subject:
                    if map.get(i['$']) != None:
                        map[i['$']].add(title)
                    else:
                        # for debug
                        print(i['$'] +' '+ i['@code'] + ' ---------- not exist')
                        # search the nearest name
                        tokens = re.split(r"[,()\s]", i['$'])
                        while '' in tokens: tokens.remove('')
                        if 'and' in tokens:
                            while 'and' in tokens: tokens.remove('and')
                        if 'miscellaneous' in tokens:
                            tokens.remove('miscellaneous')
                        if 'miscallaneous' in tokens:
                            tokens.remove('miscallaneous')
                        # for i in range(len(tokens)):
                        #     tokens[i] = tokens[i].rstrip(',')

                        for key, value in sa_to_tokens.items():
                            if value == tokens:
                                map[key].add(title)

        # Closing file
        f.close()
    # delete file
    os.remove("dump.json")


def WOS_fill_map(map, ras_db, WOS_map):
    # here we will take data by WOS api
    d = 0


def fill_collections_by_map(sa_db, map):
    for key in map.keys():
        set_of_journals = map[key]
        if len(set_of_journals) == 0:
            continue
        # return subject area names to the original names
        if key.find('(all)') != -1:
            key = 'General '+ key[:-6]
            if key.endswith(' '):
                key = key[:-1]

        collection = sa_db[key]
        list_of_documents = []
        for journal in set_of_journals:
            list_of_documents.append({"name": journal})
        collection.insert_many(list_of_documents)


def create_mapping(ras_db):
    sa_name_to_collection_name = {}

    subject_areas_collection = ras_db.subject_areas
    subject_areas_list = subject_areas_collection.distinct('name')
    WOS_subject_areas_collection = ras_db.WOS_subject_Area
    WOS_subject_areas_list = WOS_subject_areas_collection.distinct('subjectArea')

    sa_to_tokens = create_tokens_of_sa(ras_db)

    for name in WOS_subject_areas_list:
        temp_name = name.replace(" - Other Topics", "")
        tokens = temp_name.split()
        if '&' in tokens:
            tokens.remove('&')
        for i in range(len(tokens)):
            tokens[i] = tokens[i].rstrip(',')

        # In case the subject area consists of one word
        if len(tokens) == 1:
            if name in subject_areas_list:
                sa_name_to_collection_name[name] = name
            # elif name+' ' in subject_areas_list:
            # sa_name_to_collection_name[name] = name+' '
            else:
                sa_name_to_collection_name[tokens[0]] = tokens[0] + ' (miscellaneous)'
        else:
            # search the perfect match with wos subject area name
            for key, value in sa_to_tokens.items():
                if value == tokens:
                    sa_name_to_collection_name[name] = key

                """
                # check if sa_list contains tokens
                if all(elem in sa_list for elem in tokens):
                    sa_name_to_collection_name[name] = sa
            
            if sa_name_to_collection_name.get(name) == None:
                sa_name_to_collection_name[name] = '////////////////////////////'
                """
    # insert edge cases
    sa_name_to_collection_name['Computer Science'] = 'Computer Science (all)'

    return sa_name_to_collection_name


def create_tokens_of_sa(ras_db):
    map = {}
    subject_areas_collection = ras_db.subject_areas
    subject_areas_list = subject_areas_collection.distinct('name')

    for sa in subject_areas_list:
        temp_sa = sa.replace(" - Other Topics", "")
        sa_list = re.split(r"[,()\s]", temp_sa)
        while '' in sa_list: sa_list.remove('')
        if '&' in sa_list:
            while '&' in sa_list: sa_list.remove('&')
        if 'and' in sa_list:
            while 'and' in sa_list: sa_list.remove('and')
        if 'miscellaneous' in sa_list:
            sa_list.remove('miscellaneous')
        if 'miscallaneous' in sa_list:
            sa_list.remove('miscallaneous')
        # for i in range(len(sa_list)):
        #     sa_list[i] = sa_list[i].rstrip(',')
        map[sa] = sa_list

    return map


if __name__ == '__main__':
    main()
