import math
import pandas as pd


def load_data_to_DB(db):
    collection = db["scopus_subject_Area"]
    # basic document.
    document = {"_id": "", "code": "", "subjectArea": ""}

    wantedcols = [0, 1]
    df = pd.read_excel('asjc-classification-codes.xlsx', usecols=wantedcols)

    index = 0
    for i in range(len(df)):
        if math.isnan(df.loc[i, "Code"]):
            continue
        document["_id"] = index
        document["code"] = df.loc[i, "Code"]
        document["subjectArea"] = df.loc[i, "Description"]
        index += 1
        x = collection.insert_one(document)
