import { Dispatch, SetStateAction } from "react";

interface Game {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  parent_platforms: Platform[];
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
  game: number | null;
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

export type { Game, Genre, Platform, User, Rating, AuthContextProps };
