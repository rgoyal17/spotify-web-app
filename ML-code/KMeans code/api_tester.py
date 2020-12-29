from flask import Flask, redirect, request
from flask_cors import CORS
import base64, json, requests

app = Flask(__name__)
CORS(app)

@app.route('/recommend')
def get_recommendation():
    return {'recommend': 'Hello World'}

client_id = 'f2d6728148db4fdaae6137fb108b8724'
client_secret = 'a8fecbb751c94c5a953e852504101688'
redirect_uri = 'http://127.0.0.1:5000/callback'

@app.route('/login')
def login_spotify():
    scope = 'user-read-private user-read-email'
    response = 'https://accounts.spotify.com/authorize/' + '?response_type=code' + '&client_id=' + client_id + '&scope=' + scope + '&redirect_uri=' + redirect_uri 
    return redirect(response)

RESPONSE_TOKEN = ''

@app.route('/callback')
def callback():
    print(request.args['code'])
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
    print(response)
    global RESPONSE_TOKEN
    RESPONSE_TOKEN = response["access_token"]
    return redirect("http://localhost:3000/")

@app.route('/token')
def get_token():
    return {"token": RESPONSE_TOKEN}