import pandas as pd


def load_data_to_DB(db):
    collection = db["WOS_journal_names"]
    # basic document.
    document = {"_id": "", "name": ""}

    wantedcols = [0]
    df = pd.read_excel('wos-jcr 2021-March-15.xlsx', usecols=wantedcols)

    for i in range(len(df)):
        # print(df.loc[i, "Title"])
        document["_id"] = i
        document["name"] = df.loc[i, "Title"]
        x = collection.insert_one(document)

