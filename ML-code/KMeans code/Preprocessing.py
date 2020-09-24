# Preprocesses all the necessary data required.
from csv import reader
from ast import literal_eval
import pickle

artists_by_genres = {}
with open('ML-code/Data/data_by_genres.csv', 'r') as read_obj0:
    csv_reader = reader(read_obj0)
    next(csv_reader, None)
    for row in csv_reader:
        artists_by_genres[row[0]] = []
with open('ML-code/Data/data_w_genres.csv', 'r') as read_obj1:
    csv_reader = reader(read_obj1)
    next(csv_reader, None)
    for row in csv_reader:
        artist = row[0]
        genres = literal_eval(row[15])
        for genre in genres:
            artists_by_genres[genre].append(artist)

pickle.dump(artists_by_genres, open('ML-code/KMeans code/pickled_data/artists_by_genre.pkl', 'wb'))