# 2 ISSUES. Try to find potential bugs in this and we can have a code review around this later.""

import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Cleaning data
song_data = pd.read_csv("Data\data.csv")
df = pd.DataFrame(song_data)
df.drop(['artists', 'explicit', 'id', 'popularity',
        'release_date', 'year','duration_ms', 'key',
        'mode'], axis = 1, inplace=True)

# Reverse mapping index as seen in the example of the movie based recommender.
# Issue 1: Reverse mapping doesn't work with chinese and such songs
indices = pd.Series(df.index, index=df['name']).drop_duplicates()

# Vectorizing the whole CSV file.
# Issue 2: It does not work properly. Might need to switch to clustering 
# based methods or find out different similarity methods.
similarities = dict()
i = 1 # Cheap fix for Issue 1.
for row in df.itertuples():
    vector = []
    for j in range(0,11):
        if j == 7: # index 7 is the song name, not a feature.
            continue
        vector.append(row[j])
    idx = i
    similarities[idx] = np.array(vector) # Mapping every index to the song's vector
    i += 1

# Trying out cosine similarity by applying to cosine formula to the song's vector 
# to all the vectors we got from the CSV files.
def cosine_sim(index):
    query_score = similarities.get(index)
    sim_scores = []
    for idx, score in similarities.items():
        sim_scores.append((idx, cosine_similarity([score], [query_score])))
    return sim_scores

# Getting top 10 recommendations using cosine similarity based around the data.
def get_recommendations(song):
    idx = indices[song]
    sim_scores = cosine_sim(idx)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    song_indices = [i[0] for i in sim_scores]
    #print(song_indices)
    return df['name'].iloc[song_indices]

# You can change this.
print(get_recommendations('Little Dark Age'))


