import pandas as pd


def load_data_to_DB(db):
    collection = db["WOS_subject_Area"]
    # basic document.
    document = {"_id": "", "subjectArea": ""}

    wantedcols = [1]
    df = pd.read_excel('WoS Subject Classification list.xlsx', usecols=wantedcols)

    for i in range(len(df)):
        # print(df.loc[i, "Subject Areas"])
        document["_id"] = i
        document["subjectArea"] = df.loc[i, "Subject Areas"]
        x = collection.insert_one(document)
