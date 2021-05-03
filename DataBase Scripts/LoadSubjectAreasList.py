def load_data_to_DB(db):
    # get subject areas from WOS and scopus
    wos_collection = db.WOS_subject_Area
    scopus_collection = db.scopus_subject_Area
    wos_subject_area = wos_collection.distinct('subjectArea')
    scopus_subject_area = scopus_collection.distinct('subjectArea')
    # all subject areas with duplicates
    subject_areas = scopus_subject_area + wos_subject_area
    print(len(subject_areas))
    result = []
    marker = set()
    for sa in subject_areas:
        fixed_sa = sa.lower()
        fixed_sa = fixed_sa.replace("and", "")
        fixed_sa = fixed_sa.replace("&", "")
        fixed_sa = fixed_sa.replace(",", "")
        fixed_sa = fixed_sa.replace("-", "")
        fixed_sa = fixed_sa.replace("(miscellaneous)", "")
        fixed_sa = fixed_sa.replace("other topics", "")
        fixed_sa = fixed_sa.replace(" ", "")
        if fixed_sa not in marker:  # test presence
            marker.add(fixed_sa)
            result.append(sa)  # preserve order
    collection = db["subject_areas"]

    # go over list
    list_of_documents = []
    for item in result:
        list_of_documents.append({"name": item})
    collection.insert_many(list_of_documents)
