import pyscopus
from pyscopus import Scopus
key_1 = 'cb9ed59ab9261f2862d1dd86abd11df3'
key_2 = 'eff2bb99109d0d9f9af51c218b35e998'
scopus = Scopus(key_1)



meta_df, citescore_df, sj_rank_df = scopus.search_serial('informetrics')
print(citescore_df)


zuo_info_dict = scopus.retrieve_author('57189222659')
print(zuo_info_dict.keys())


author_result_df = scopus.search_author("AUTHLASTNAME(Zuo) and AUTHFIRST(Zhiya) and AFFIL(Iowa)")
print(author_result_df)

"""

search_df = scopus.search("KEY(topic modeling)", count=30)
print(search_df.head(10))

"""
