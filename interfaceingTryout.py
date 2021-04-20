import pyscopus
from pyscopus import Scopus
key_1 = 'cb9ed59ab9261f2862d1dd86abd11df3'
key_2 = 'eff2bb99109d0d9f9af51c218b35e998'
scopus = Scopus(key_1)


try:
    meta_df, citescore_df, sj_rank_df = scopus.search_serial('informatics')
    print(meta_df['prism:issn'][0])
    print(citescore_df.citeScore[0], citescore_df.citeScore[1])
    numOfSubjectArea = len(meta_df['subject-area'][0])
    print(meta_df['subject-area'][0])
    lines = sj_rank_df.head(numOfSubjectArea*2).tail(numOfSubjectArea)
    print(lines['subjectCode'][2] + ' ' + lines['rank'][2])
    print(lines['subjectCode'][3] + ' ' + lines['rank'][3])
except AttributeError as e:
    print("batel")

#zuo_info_dict = scopus.retrieve_author('57189222659')
#print(zuo_info_dict.keys())


#author_result_df = scopus.search_author("AUTHLASTNAME(Zuo) and AUTHFIRST(Zhiya) and AFFIL(Iowa)")
#print(author_result_df)

"""

search_df = scopus.search("KEY(topic modeling)", count=30)
print(search_df.head(10))

"""
