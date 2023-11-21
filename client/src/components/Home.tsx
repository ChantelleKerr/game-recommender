import GameList from "./GameList";
import GameService from "../services/game";
import { useContext, useEffect, useState } from "react";
import { Game } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

interface IGameInformation {
  allGames: Game[];
  recommended: Game[];
}

const Home = () => {
  const { user } = useContext<any>(AuthContext);
  const [games, setGames] = useState<IGameInformation>();
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      if (!user) navigate("/login");

      const allGamesResponse = await GameService.getGames();
      const allGamesData = allGamesResponse.data;

      const recommendedGamesResponse = await GameService.getRecommendedGames(
        user.user_id
      );
      const recommendedGamesData = recommendedGamesResponse.data;

      setGames({
        allGames: allGamesData,
        recommended: recommendedGamesData,
      });
      setLoading(false);
    };
    fetchGames();
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <GameList games={games?.recommended} title="Recommendations" />
          <GameList games={games?.allGames} title="All Games" />
        </div>
      )}
    </>
  );
};

export default Home;
