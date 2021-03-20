import pickle


def get_info():
    file = open("scopus-journal-list-download.csv", 'r', encoding='cp1252')
    data = file.readlines()

    journals_list = []
    for i, line in enumerate(data):
        split_line = line.split(',')
        # information begins at 40th row
        if 39 <= i:
            if i == 51 or i == 50:
                continue
            print(i, split_line[1])
            # 1- Journal title
            journals_list.append(split_line[1])

    with open('journal_list', 'wb') as fp:
        pickle.dump(journals_list, fp)


if __name__ == "__main__":
    get_info()
