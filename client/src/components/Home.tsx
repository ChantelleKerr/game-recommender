import GameList from "./GameList";
import GameService from "../services/game";
import { useEffect, useState } from "react";
import { Game } from "types";

const Home = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await GameService.getGames();
      setGames(data);
      setLoading(false);
    };
    fetchGames();
  }, []);
  return <>{!loading && <GameList games={games} />}</>;
};

export default Home;
