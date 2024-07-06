# Rawg Game API

The goal is to use the RAWG API to extract a small subset of game data and relevant fields to use in the Game Recommender program.

For more information on the API please visit: <a href="https://rawg.io/apidocs">https://rawg.io/apidocs</a>

## Extract relevant data to preload into Django

Under the `game-data-scrapper` folder. A program (get_games.py) is used to make a GET request to the API for a given page. Each page contains information of 20 games.

The purpose of this programe is to extract relevant information into a JSON format that can be loaded into Django when starting the docker container. This can be done by copying the generated files into `server/fixture_data/fixtures/` folder.

### Generated JSON files

#### games.json

A list of games with the following format:

```json
  [
    {
        "model": "game.game",
        "fields": {
            "name": "Grand Theft Auto V",
            "image": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
            "platforms": [
                3,
                1
            ],
            "genres": [
                1
            ]
        }
    },
    ...
  ]
```

#### genres.json

A list of genres with the following format:

```json
[
  {
      "model": "game.genre",
      "fields": {
          "name": "Action"
      }
  },
  ...
]
```

## Running the Program

You will be required to setup a RAWG account and acquire an API key. Store the given key in a `.env` file as the following:
`RAWG_API_KEY="[key goes here]"`

You will be required to use a virtual environment to install the following dependencies:

- requests
- python-dotenv

Make sure you are in the `game-data-scrapper` directory and run
`python3 get_game.py`
