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
export type { Game, Genre, Platform };
