import { Dispatch, SetStateAction } from "react";

interface Game {
  id: number;
  name: string;
  image: string;
  genres?: Genre[];
  platforms?: Platform[];
}

interface TopRatedGames extends Game {
  average_rating: number;
}
interface Genre {
  name: string;
}

interface Platform {
  name: string;
}

interface User {
  id?: number;
  email?: string;
  username: string;
  password?: string;
}

interface Rating {
  user: number | null;
  game: number | Game;
  rating: number;
  platform: string;
}

interface AuthContextProps {
  authTokens: { refresh: string; access: string } | null;
  user: any | null;
  setUser: Dispatch<SetStateAction<any | null>>;
  setAuthTokens: Dispatch<
    SetStateAction<{ refresh: string; access: string } | null>
  >;
}

export type {
  Game,
  Genre,
  Platform,
  TopRatedGames,
  User,
  Rating,
  AuthContextProps,
};
