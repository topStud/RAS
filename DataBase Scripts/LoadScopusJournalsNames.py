import pickle
from pandas import read_excel


def get_info():
    df = read_excel('scopus-journal-list-download.xlsx', engine='openpyxl')
    unwonted_rows = [11, 12, 40803]
    df.drop(df.index[unwonted_rows], inplace=True)

    # save to file
    with open('journal_list', 'wb') as fp:
        pickle.dump(df['Source Title (Medline-sourced journals are indicated in Green)'].values, fp)


def load_data_to_DB(db):
    scopus_journals_collection = db.scopus_Journal_names

    # getting list of names from journal_list file
    with open('journal_list', 'rb') as fp:
        journals_list = pickle.load(fp)

    # go over list
    list_of_documents = []
    for item in journals_list:
        list_of_documents.append({"name": item})
    scopus_journals_collection.insert_many(list_of_documents)


