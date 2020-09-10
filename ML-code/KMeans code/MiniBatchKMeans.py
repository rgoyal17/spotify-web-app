# MiniBatchKMeans model preparation fitted according to Spotify song data.
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import MiniBatchKMeans

# Loading the Spotify song data and then selecting the useful features
df_full = pd.read_csv("spotify-web-app\ML-code\Data\data.csv")
features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']
df_full = df_full[(df_full.popularity > 30) & (df_full.year > 1980)]
df = df_full[features]

# Standarizing all column values 
scaler = StandardScaler().fit(df.values)
X_std = scaler.transform(df.values)

# MiniBatchKMeans model formation fitted according to standardized song feature values.
kmeans = MiniBatchKMeans(n_clusters=50, random_state=0, batch_size=100)
kmeans = kmeans.fit(X_std)

# unloading and creating essential information required by a recommender system.
pickle.dump(scaler, open("spotify-web-app\ML-code\KMeans code\pickled_data\scaler.pkl", "wb"))
pickle.dump(kmeans, open("spotify-web-app\ML-code\KMeans code\pickled_data\model.pkl", "wb"))
df.to_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_feature_data.csv", index=False)
df_full.to_csv("spotify-web-app\ML-code\KMeans code\KMeans_data\cleaned_data.csv", index=False)