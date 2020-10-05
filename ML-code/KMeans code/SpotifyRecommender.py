import pandas as pd
import numpy as np
import pickle
from scipy.spatial import distance
from sklearn.preprocessing import StandardScaler

class SpotifyRecommender:
    def __init__(self):
        self.df_artists_songs = (pd.read_csv("ML-code/KMeans code/KMeans_data/cleaned_feature_data.csv"))
        self.df = (self.df_artist_songs.drop(['artists'], axis=1)).to_numpy()

        # can remove this after adjusting according to the specific API calls.
        self.data_full = (pd.read_csv("ML-code/KMeans code/KMeans_data/cleaned_data.csv"))

        self.df_artists_attributes = pd.read_csv("ML-code/KMeans code/KMeans_data/cleaned_genre_data.csv")
        self.df_artists = pd.read_csv("ML-code/Data/data_w_genres.csv", header=False)
        self.kmeans = pickle.load(open("ML-code/KMeans code/pickled_data/model.pkl", "rb"))
        self.scaler = pickle.load(open("ML-code/KMeans code/pickled_data/scaler.pkl", "rb"))
        self.artist_genres = pickle.load(open("ML-code/KMeans code/pickled_data/artists_by_genre.pkl", "rb"))
    
    def recommend(self, artist_name, spotifyQuery):
        # Preparing all recommendations.
        recommend_list = []
        recommend_list.extend(self.__artist_rec(artist_name, spotifyQuery))
        recommend_list.extend(self.__genre_rec(artist_name))
        recommend_list.extend(self.__ML_rec(spotifyQuery))
        
        # Returning printable values (CHANGE THIS ACCORDING TO YOUR API NEEDS)
        ret = []
        for index in range(len(recommend_list)):
            i = (recommend_list[index])[0]
            ret.append(data_full._get_value(i, "name") + " by " +\
                       data_full._get_value(i, "artists"))
        return ret

    # TODO: Make /cleaned_artist.csv to get artist_attributes
    def __genre_rec(self, artist):
        # Getting the artist's information.
        genres = (self.df_artists.loc[self.df_artists['artists'] == artist]).iloc[0][15]
        artist_data = self.df_artists_attributes[self.df_artists_attributes['artists'] == artist]
        artist_attributes = artist_data[:, 1:9]
        # Getting similar artists based on common genres.
        common_artists = {}
        for genre in genres:
            genre_list = self.artist_genres.get(genre)
            for other_artist in genre_list:
                if not other_artist in common_artists:
                    common_artists[other_artist] = 1
            else:
                common_artists[other_artist] += 1
        sorted_list = sorted(common_artists.keys(), key=lambda x: x[1])

        # Only using the most common artists.
        highest_value = common_artists.get(sorted_list[0])
        df_common_artists = self.df_artists.loc[sorted_list[0]]
        for i in range(1, len(sorted_list)):
            if common_artists.get(sorted_list[i]) < highest_value:
                break
            df_common_artists.append(self.df_artists.loc[sorted_list[i]])

        indexes = []        
        return self.__euclidean_min(df_common_artists, artist_attributes, \
                                    [x for x in range(0, df_common_artists.count())], output_num=2)
            

    def __artist_rec(self, artist, spotifyQuery):
        df_artist_songs = (self.df_artists_songs.loc[self.df_artists_songs['artists'] == artist])
        return self.__euclidean_min(df_artist_songs, spotifyQuery.to_numpy(),\
                                    [x for x in range(0, df_artist_songs.count())], output_num=2)

    def __ML_rec(self, spotifyQuery):
        # standardizing the query song and getting its cluster label.
        query_std = self.scaler.transform([spotifyQuery])
        cluster_label = self.kmeans.predict(query_std)

        # Getting all the cluster points from the query song's cluster label.
        labels = self.kmeans.labels_
        indexes = []
        for index in range(len(labels)):
            if (labels[index] == cluster_label):
                indexes.append(index)
        
        return self.__euclidean_min(self.df, query_std, indexes)

    # Calculating normal euclidean distance between desired mutli-dimensional points and returning
    # only the closest desired number of points.
    def __euclidean_min(self, _df, data_point, indexes, output_num=5):
        distances = {}
        for index in indexes:
            point = tuple(self.scaler.transform([_df[index]]))
            distances[index] = distance.euclidean(point, tuple(data_point))
        return (sorted(distances.items(), key=lambda x: x[1]))[:output_num]