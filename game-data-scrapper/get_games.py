import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()
RAWG_URL = 'https://api.rawg.io/api/games?key='
API_KEY = os.environ.get('RAWG_API_KEY')
PAGE = 1
URL = f'{RAWG_URL}{API_KEY}&page={PAGE}'

ALLOWED_PLATFORMS = ['Playstation', 'Xbox', 'Nintendo', 'PC', 'Mobile']

games = []
genres = []
seen_genres = set()
genre_to_id = {}


def add_existing_genres():
  if os.path.exists('genres.json'):
    with open('genres.json', 'r') as json_file:
      existing_genres = json.load(json_file)
      for idx, genre_info in enumerate(existing_genres):
        genre_name = genre_info['fields']['name']
        seen_genres.add(genre_name)
        genre_to_id[genre_name] = idx + 1
        genres.append(genre_info)


def add_genre(genre):
    if genre not in seen_genres:
      seen_genres.add(genre)
      genre_id = len(seen_genres)
      genre_to_id[genre] = genre_id
      genres.append({
          "model": "game.genre",
          "fields": {
              "name": genre
          }
      })
      return genre_id
    else:
        return genre_to_id[genre]


def get_rawg_games():
  # Make GET request to rawg api and retrieve list of games
  response = requests.get(URL)
  return response.json()['results']


def extract_game_data(game_results):
  # Extract relevant data and store into JSON to be used for Django Fixtures
  for game in game_results:
    current_game = {
      "model": "game.game",
      "fields": {
        "name": game['name'],
        "image": game['background_image'],
        "platforms": [],
        "genres": []
      }
    }

    for platform in game['parent_platforms']:
      platform_name = platform['platform']['name']
      if platform_name in ALLOWED_PLATFORMS:
         id = ALLOWED_PLATFORMS.index(platform_name)
         current_game['fields']['platforms'].append(id)
    
    # We dont want to add a game for a platform that we don't allow
    if len(current_game['fields']['platforms']) == 0:
       continue
    
    for genre in game['genres']:
      genre_id = add_genre(genre['name'])
      current_game['fields']['genres'].append(genre_id)

    games.append(current_game)

def output_genres_to_json():
  with open('genres.json', 'w') as json_file:
    json.dump(genres, json_file, indent=4)

def output_games_to_json():
  with open('games.json', 'w') as json_file:
    json.dump(games, json_file, indent=4)

if __name__ == '__main__':
  add_existing_genres()

  game_results = get_rawg_games()
  extract_game_data(game_results)
  output_genres_to_json()
  output_games_to_json()






  



