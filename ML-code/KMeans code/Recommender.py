# The KMeans Recommender algorithm. MUST RUN MiniBatchKMeans.py before.
import pandas as pd
import numpy as np
import pickle
from scipy.spatial import distance
from sklearn.preprocessing import StandardScaler

# Loading all the essential information required by this recommender.
data = (pd.read_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_feature_data.csv")).to_numpy()
data_full = (pd.read_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_data.csv"))
kmeans = pickle.load(open("spotify-web-app\ML-code\KMeans code\pickled_data\model.pkl", "rb"))
scaler = pickle.load(open("spotify-web-app\ML-code\KMeans code\pickled_data\scaler.pkl", "rb"))
artists_by_genres = pickle.load(open("ML-code/KMeans code/pickled_data/artists_by_genre.pkl", "rb"))

# Song data used for recommendation. You can add/uncomment a particular song that you want.
query = [0.0826, 0.575, 0.804, 0.000363, 0.0681, -3.933, 0.0626, 122.08, 0.399] # Flash Delirium by MGMT
# query = [0.39, 0.853, 0.351, 9.38E-06, 0.752, -10.198, 0.241, 118.028, 0.282] # wish you were gay by Billie Eilish

# standardizing the query song and getting its cluster label.
query_std = scaler.transform([query])
cluster_label = kmeans.predict(query_std)

# Getting all the cluster points from the query song's cluster label.
labels = kmeans.labels_
indexes = []
for index in range(len(labels)):
    if (labels[index] == cluster_label):
        indexes.append(index)

# Returns a list of 5 songs recommended according to our model.
# ISSUE: If song is contained within our dataset, the method reports the 
# same song again.
def basic_rec(cluster_indexes, data_point):
    distances = {}
    for index in cluster_indexes:
        point = tuple(scaler.transform([data[index]]))
        distances[index] = distance.euclidean(point, data_point)
    sorted_list = sorted(distances.items(), key=lambda x: x[1])
    sorted_list = sorted_list[:5]
    ret = []
    for index in range(5):
        i = (sorted_list[index])[0]
        ret.append(data_full._get_value(i, "name") + " by " + data_full._get_value(i, "artists"))
    return ret

def genre_rec(artists_by_genres) {
    pass
}

def artist_rec(artist) {
    pass
}

def song_list_gen(cluster_indexes, data_point, artist, artists_by_genres):
    ret = []
    ret.append(artist_rec())
    ret.append(genre_rec())
    ret.append(basic_rec(cluster_indexes, data_point))
    return ret

# printing our list of recommendations
print(song_list_gen(indexes, tuple(query_std), 'Billie Eilish', artists_by_genres))
