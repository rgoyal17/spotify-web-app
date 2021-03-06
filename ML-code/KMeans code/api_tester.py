from flask import Flask, redirect, request
from flask_cors import CORS
import base64, json, requests

app = Flask(__name__)
CORS(app)

@app.route('/recommend')
def get_recommendation():
    songId = request.args.get('songId')
    acousticness = request.args.get('acousticness')
    danceability = request.args.get('danceability')
    energy = request.args.get('energy')
    instrumentalness = request.args.get('instrumentalness')
    liveness = request.args.get('liveness')
    loudness = request.args.get('loudness')
    speechiness = request.args.get('speechiness')
    tempo = request.args.get('tempo')
    valence = request.args.get('valence')
    # use this songId to give song recommendations
    return {'songId': songId, 'acousticness': acousticness, 'danceability': danceability, 'energy': energy,
    'instrumentalness': instrumentalness, 'liveness': liveness, 'loudness': loudness, 'speechiness': speechiness,
    'tempo': tempo, 'valence': valence}

client_id = 'f2d6728148db4fdaae6137fb108b8724'
client_secret = 'a8fecbb751c94c5a953e852504101688'
redirect_uri = 'http://127.0.0.1:5000/callback'

@app.route('/login')
def login_spotify():
    scope = ''
    response = 'https://accounts.spotify.com/authorize/' + '?response_type=code' + '&client_id=' + client_id + '&redirect_uri=' + redirect_uri 
    return redirect(response)

RESPONSE_TOKEN = ''

@app.route('/callback')
def callback():
    code_payload = {
        "grant_type": "authorization_code",
        "code": request.args['code'],
        "redirect_uri": 'http://127.0.0.1:5000/callback',
        'client_id': 'f2d6728148db4fdaae6137fb108b8724',
        'client_secret': 'a8fecbb751c94c5a953e852504101688',
    }
    post = requests.post('https://accounts.spotify.com/api/token', data=code_payload)
    response = json.loads(post.text)
    auth_head = {"Authorization": "Bearer {}".format(response["access_token"])}
    global RESPONSE_TOKEN
    RESPONSE_TOKEN = response["access_token"]
    return redirect("http://localhost:3000/")

@app.route('/token')
def get_token():
    return {"token": RESPONSE_TOKEN}

@app.route('/authorization')
def authorization():
    code_payload = {
        "grant_type": "client_credentials",
        'client_id': 'f2d6728148db4fdaae6137fb108b8724',
        'client_secret': 'a8fecbb751c94c5a953e852504101688',
    }
    post = requests.post('https://accounts.spotify.com/api/token', data=code_payload)
    response = json.loads(post.text)
    print(response)
    return {"token": response['access_token']}