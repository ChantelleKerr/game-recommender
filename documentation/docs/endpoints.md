# API Endpoints

## Base URL

**Development:** `localhost:8000/api`

## Game Endpoints

---

#### /game/get_games/

**Description:**
Returns a list of all games.

**Method:**
`GET`

**Permissions:**
User must be authenticated with Bearer access token.

**Responses**

- `200 OK` - Successfully retrieved a list of all games.
- `401 Unauthorised` - Invalid credentials

#### /game/get_recommendation/id/

**Description:**
Returns a list of game recommendations for a specific user.

**Method:**
`GET`

**Permissions:**
User must be authenticated with Bearer access token.

**Parameters:**
`id` - ID of the user requesting recommendations.

**Responses**

- `200 OK` - Successfully retrieved the list of recommended games.
- `401 Unauthorised` - Invalid credentials.
- `404 Not Found` - User does not exist.

#### /game/get_top_rated/

**Description:**
Returns a list of top-rated games based on average ratings.

**Method:**
`GET`

**Permissions:**
User must be authenticated with Bearer access token.

**Responses**

- `200 OK` - Successfully retrieved the list of top-rated games.
- `401 Unauthorised` - Invalid credentials

## Rating Endpoints

---

#### /rating/create/

**Description:**
Adds a new rating for a game.

**Method:**
`POST`

**Permissions:**
User must be authenticated with Bearer access token.

**Request Body:**

```json
{
  "user": "integer (user id)",
  "game": "Game Object",
  "rating": "decimal (rating value)",
  "platform": "string (Platform name)"
}
```

**Responses**

- `200 OK` - Successfully added the rating.
- `400 Bad Request` - Invalid request data.
- `401 Unauthorized` - Invalid credentials.

#### /rating/get/id/

**Description:**
Returns all ratings submitted by a specific user.

**Method:**
`GET`

**Permissions:**
User must be authenticated with Bearer access token.

**Parameters:**
`id` - ID of the user requesting ratings

**Responses**

- `200 OK` - Successfully retrieved the list of ratings.
- `401 Unauthorized` - Invalid credentials.

#### /rating/delete/id/

**Description:**
Deletes a specific rating.

**Method:**
`DELETE`

**Permissions:**
User must be authenticated with Bearer access token.

**Parameters:**
id - ID of the rating to delete.

**Responses**

- `204 No Content` - Rating deleted successfully.
- `401 Unauthorized` - Invalid credentials.
- `404 Not Found` - Rating with the provided ID does not exist.

## Auth Endpoints

---

#### /auth/token/

**Description:**
Obtains a JSON Web Token (JWT) pair (access and refresh tokens) for authentication

**Method:**
`POST`

**Request Body:**

```
{
    "username": "string",
    "password": "string"
}
```

**Responses**

- `200 OK` - Successfully obtained token pair

```
{
    "access": "string (JWT access token)",
    "refresh": "string (JWT refresh token)"
}
```

- `401 Unauthorised` - Invalid Credentials

#### /auth/token/refresh/

**Description:**
Refreshes the access token using the refresh token.

**Method:**
`POST`

**Request Body:**

```
{
    "refresh": "string (JWT refresh token)"
}
```

**Responses**

- `200 OK` - Successfully refreshed the access token.

```
{
    "access": "string (JWT access token)",
    "refresh": "string (JWT refresh token)"
}
```

- `401 Unauthorised` - Invalid or expired refresh token

#### /auth/token/logout/

**Description:**
Logs out the user by blacklisting the refresh token.

**Method:**
`POST`

**Permissions:**
User must be authenticated with Bearer access token.

**Request Body:**

```
{
    "refresh": "string (JWT refresh token)"
}
```

**Responses**

- `200 OK` - Successfully logged out.

```
{
    "access": "string (JWT access token)",
    "refresh": "string (JWT refresh token)"
}
```

- `401 Unauthorised` - Invalid or expired refresh token

#### /auth/token/register/

**Description:**
Registers a new user.

**Method:**
`POST`

**Request Body**

```
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

**Responses**

- `200 OK` - Successfully registered the user.

```
{
    "access": "string (JWT access token)",
    "refresh": "string (JWT refresh token)"
}
```

- `400 Bad Request` - Invalid request data (e.g., username already exists)
