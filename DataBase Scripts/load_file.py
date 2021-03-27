from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient
from LoadJournalsNames import load_data_to_DB as namesLoad
from ParseSubjectArea import insert_info as subjectAreaLoad

# constants
IP = 'localhost'
PORT = 27017


def main():
    try:
        # connecting to db
        client = MongoClient(IP, PORT)
        db = client.RAS_DB

        # loading data
        print("loading journal names collection...")
        namesLoad(db)
        print("loading subject area collection...")
        # subjectAreaLoad(db)

        # closing connection
        client.close()
    except ServerSelectionTimeoutError as e:
        print(e)
        exit(TimeoutError)
    except Exception as e:
        print(e)
        exit(-1)


if __name__ == '__main__':
    main()
