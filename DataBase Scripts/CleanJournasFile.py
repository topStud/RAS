import pickle
from pandas import read_excel
from pymongo import MongoClient


def get_info():
    df = read_excel('scopus-journal-list-download.xlsx', engine='openpyxl')
    unwonted_rows = [11, 12, 40803]
    df.drop(df.index[unwonted_rows], inplace=True)

    # save to file
    with open('journal_list', 'wb') as fp:
        pickle.dump(df['Source Title (Medline-sourced journals are indicated in Green)'].values, fp)


def enter_data_to_DB(ip='localhost', port=27017):
    client = MongoClient(ip, port)
    db = client.RAS_DB
    journals_collection = db.Journal_names

    # getting list of names from journal_list file
    with open('journal_list', 'rb') as fp:
        journals_list = pickle.load(fp)

    # go over list
    list_of_documents = []
    for item in journals_list:
        list_of_documents.append({"name": item})
    journals_collection.insert_many(list_of_documents)


if __name__ == "__main__":
    # get_info()
    enter_data_to_DB()
