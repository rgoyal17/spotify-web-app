import pandas as pd
import numpy as np
import random
import operator
import math
import datetime

first = datetime.datetime.now()

df_full = pd.read_csv("Data/data.csv")

columns = list(df_full.columns)
features = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'valence']
df_full = df_full[(df_full.popularity > 30) & (df_full.year > 1980)]
df = df_full[features]

# Number of Clusters
k = 50
# Maximum number of iterations
MAX_ITER = 100
# Number of data points
n = len(df)
# Fuzzy parameter
m = 1.7 #Select a value greater than 1 else it will be knn

# initializing the membership matrix
def initializeMembershipMatrix():
    membership_mat = []
    for i in range(n):
        num = random.randint(0, k-1);
        num_list = [0] * k;
        num_list[num] = 1;
        membership_mat.append(num_list)
    return membership_mat

# calculating the cluster center
def calculateClusterCenter(membership_mat):
    cluster_mem_val = list(zip(*membership_mat))
    cluster_centers = []
    for j in range(k):
        x = list(cluster_mem_val[j])
        xraised = [p ** m for p in x]
        denominator = sum(xraised)
        temp_num = []
        for i in range(n):
            data_point = list(df.iloc[i])
            prod = [xraised[i] * val for val in data_point]
            temp_num.append(prod)
        numerator = map(sum, list(zip(*temp_num)))
        center = [z/denominator for z in numerator]
        cluster_centers.append(center)
    return cluster_centers

# Updating the membership value
def updateMembershipValue(membership_mat, cluster_centers):
    p = float(2/(m-1))
    for i in range(n):
        x = list(df.iloc[i])
        distances = [np.linalg.norm(np.array(list(map(operator.sub, x, cluster_centers[j])))) for j in range(k)]
        for j in range(k):
            den = sum([math.pow(float(distances[j]/distances[c]), p) for c in range(k)])
            membership_mat[i][j] = float(1/den)
    return membership_mat

# getting the clusters
def getClusters(membership_mat):
    cluster_labels = list()
    for i in range(n):
        max_val, idx = max((val, idx) for (idx, val) in enumerate(membership_mat[i]))
        cluster_labels.append(idx)
    return cluster_labels

def fuzzyCMeansClustering():
    # Membership Matrix
    membership_mat = initializeMembershipMatrix()
    cluster_labels = ()
    cluster_centers = []
    prev_centers = []
    prev_clusters = list()
    curr = 0
    # to count cluster label repetitions
    count = 0

    while curr < MAX_ITER:
        print(curr)
        cluster_centers = calculateClusterCenter(membership_mat)
        if (cluster_centers == prev_centers):
            break
        prev_centers = cluster_centers
        membership_mat = updateMembershipValue(membership_mat, cluster_centers)
        cluster_labels = getClusters(membership_mat)
        if (prev_clusters == cluster_labels):
            count += 1
        prev_clusters = cluster_labels
        curr += 1

    print("cluster label repetitions: " + str(count))

    matrix_df = pd.DataFrame(data=np.array(membership_mat))
    matrix_df.to_csv("output.csv", index=False, header=False)
    clusters_df = pd.DataFrame(data=np.array(cluster_labels))
    clusters_df.to_csv("labels.csv", index=False, header=False)

    return cluster_labels, cluster_centers

fuzzyCMeansClustering()

print("total time: " + str((datetime.datetime.now() - first).total_seconds()))