from SpotifyRecommender import SpotifyRecommender

recommender = SpotifyRecommender()
SpotifyQuery = [0.0102,0.705,0.712,0.000855,0.1,-6.156,0.0385,97.512,0.62] # Little Dark Age by MGMT

print(recommender.recommend('MGMT', SpotifyQuery))
