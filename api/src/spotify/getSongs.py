import time
import requests

spotifyAPI = 'https://api.spotify.com/v1/recommendations'
spotifyLogin = 'https://accounts.spotify.com/api/token'
createURL = 'https://api.spotify.com/v1/playlists'
authorization = 'MThlMGY2ZDNhODE4NDAwODgyYjAxMWE2YTYxZWI0Y2E6N2ExZjg2MjU2NGJiNDExNmIwOTJhZGI5NmUyYTcxYTg='
expires = 0
bearer_token = ''

def get(genres):
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + str(get_bearer_token())
    }
    data = {
        'seed_tracks': '0c6xIDDpzE81m2q797ordA',
        'seed_genres': 'trance, techno',
        'limit': 3
    }
    response = requests.get(spotifyAPI, params=data, headers=headers)
    tracks = response.json()['tracks']
    for track in tracks:
        print(track['external_urls']['spotify'])
    pass


def get_bearer_token():
    if expires < time.time():
        bearer_token = get_access_token()
    return bearer_token


def get_access_token():
    headers = {
        'Authorization': 'Basic ' + authorization
    }
    data = { 'grant_type': 'client_credentials' }
    response = requests.post(spotifyLogin, data=data, headers=headers)
    if response.status_code == 200:
        expires = time.time() + response.json()['expires_in']*1000
        return response.json()['access_token']
    else:
        return ''

get([])