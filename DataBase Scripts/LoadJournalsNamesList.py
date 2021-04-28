def load_data_to_DB(db):
    # get names from WOS and scopus
    wos_names_collection = db.WOS_journal_names
    scopus_names_collection = db.scopus_Journal_names
    wos_names = wos_names_collection.distinct('name')
    scopus_names = scopus_names_collection.distinct('name')
    # all journals names with duplicates
    names = scopus_names + wos_names
    print(len(names))
    result = []
    marker = set()
    for journal in names:
        fixed_journal = journal.lower()
        fixed_journal = fixed_journal.replace("-", "")
        fixed_journal = fixed_journal.replace(",", "")
        fixed_journal = fixed_journal.replace("'", "")
        fixed_journal = fixed_journal.replace("&", "")
        fixed_journal = fixed_journal.replace(".", "")
        fixed_journal = fixed_journal.replace("and", "")
        fixed_journal = fixed_journal.replace(" ", "")
        if fixed_journal not in marker:  # test presence
            marker.add(fixed_journal)
            result.append(journal)  # preserve order
    collection = db["journals_names"]

    # go over list
    list_of_documents = []
    for item in result:
        list_of_documents.append({"name": item})
    collection.insert_many(list_of_documents)
