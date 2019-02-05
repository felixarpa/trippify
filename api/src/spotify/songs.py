import requests

from src import *
from src.spotify import spotify


def get_album(genres):
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + str(spotify.get_bearer_token())
    }
    data = {
        'seed_tracks': SPOTIFY_API_SEED,
        'seed_genres': ', '.join(genres),
        'limit': 1
    }
    response = requests.get(SPOTIFY_API_URL, params=data, headers=headers)
    response_json = response.json()
    if 'tracks' in response_json:
        tracks = response_json['tracks']
        for track in tracks:
            if 'external_urls' in track and 'spotify' in track['external_urls']:
                return track['external_urls']['spotify']
    return None
