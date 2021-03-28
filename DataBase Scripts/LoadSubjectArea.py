import math
import pymongo
import pandas as pd


def insert_info(db):
    collection = db["scopus_subject_Area"]
    # basic document.
    document = {"_id": "", "code": "", "subjectArea": ""}

    cols = [0, 1]
    df = pd.read_excel('asjc-classification-codes.xlsx', usecols=cols)

    index = 0
    for i in range(len(df)):
        if math.isnan(df.loc[i, "Code"]):
            continue
        # print(df.loc[i, "Code"], df.loc[i, "Description"])
        document["_id"] = index
        document["code"] = df.loc[i, "Code"]
        document["subjectArea"] = df.loc[i, "Description"]
        index += 1
        x = collection.insert_one(document)


if __name__ == "__main__":
    insert_info()


