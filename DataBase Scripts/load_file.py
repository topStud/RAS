from pymongo.errors import ServerSelectionTimeoutError
from pymongo import MongoClient
from LoadScopusJournalsNames import load_data_to_DB as scopusNamesLoad
from LoadScopusSubjectArea import load_data_to_DB as scopusSubjectAreaLoad
from LoadWOSSubjectArea import load_data_to_DB as WOSSubjectAreaLoad
from LoadWOSJournalsNames import load_data_to_DB as WOSNamesLoad
from LoadJournalsNamesList import load_data_to_DB as JournalsNamesLoad
# constants
IP = 'localhost'
PORT = 27017


def main():
    try:
        # connecting to db
        client = MongoClient(IP, PORT)
        db = client.RAS_DB

        # loading data
        print("loading scopus journal names collection...")
        scopusNamesLoad(db)
        print("loading scopus subject area collection...")
        scopusSubjectAreaLoad(db)
        print("loading WOS subject area collection...")
        WOSSubjectAreaLoad(db)
        print("loading WOS journal names collection...")
        WOSNamesLoad(db)
        print("loading united journals names list...")
        JournalsNamesLoad(db)

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
