# TODO Figure out whether how to make df_artists based on SpotifyRecommender.

# Preprocesses all the necessary data required.
import pickle
import pandas as pd
import numpy as np
from csv import reader
from ast import literal_eval
from sklearn.cluster import MiniBatchKMeans
from sklearn.preprocessing import StandardScaler

# Loading the Spotify song data and then selecting the useful features
features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']
df_full = pd.read_csv("spotify-web-app\ML-code\Data\data.csv")
df_full = df_full[(df_full.popularity > 30) & (df_full.year > 1980)]
df = df_full[features]
df_artists = pd.read_csv("ML-code/Data/data_by_artist.csv")
df_artists = df_artists[features]

# Standarizing all column values
scaler = StandardScaler().fit(df.values)
X_std = scaler.transform(df.values)

# MiniBatchKMeans model formation fitted according to standardized song feature values.
kmeans = MiniBatchKMeans(n_clusters=50, random_state=0, batch_size=100)
kmeans = kmeans.fit(X_std)

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
        artist_attributes = []
        for index in range(1, 11):
            if index == 3:
                continue
            artist_attributes.append(row[index])
        artist = (row[0], artist_attributes)
        genres = literal_eval(row[15])
        for genre in genres:
            artists_by_genres[genre].append(artist)

pickle.dump(scaler, open("spotify-web-app\ML-code\KMeans code\pickled_data\scaler.pkl", "wb"))
pickle.dump(kmeans, open("spotify-web-app\ML-code\KMeans code\pickled_data\model.pkl", "wb"))
pickle.dump(artists_by_genres, open('ML-code/KMeans code/pickled_data/artists_by_genre.pkl', 'wb'))
df_artists.to_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_artist_data.csv")
df.to_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_feature_data.csv", index=False)
df_full.to_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_data.csv", index=False)