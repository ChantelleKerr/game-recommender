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
export type { Game, Genre, Platform, User };
