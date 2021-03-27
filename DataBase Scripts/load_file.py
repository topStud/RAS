from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient
from LoadJournalsNames import load_data_to_DB as namesLoad
from ParseSubjectArea import insert_info as subjectAreaLoad

# constants
IP = 'localhost'
PORT = 27017


def main():
    try:
        client = MongoClient(IP, PORT)
        # getting database of project
        db = client.RAS_DB
    except ServerSelectionTimeoutError as e:
        print(e)
        exit(TimeoutError)
    except Exception as e:
        print(e)
        exit(-1)

    print("loading journal names collection...")
    namesLoad(db)
    print("loading subject area collection...")
    # subjectAreaLoad(db)


if __name__ == '__main__':
    main()
