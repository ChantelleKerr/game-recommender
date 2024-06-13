import GameList from "../components/Game/GameList";
import GameService from "../services/game";
import { useContext, useEffect, useState } from "react";
import { Game } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import FeaturedGame from "../components/FeaturedGame";

interface IGameInformation {
  allGames: Game[];
  recommended: Game[];
}

const Home = () => {
  const { user } = useContext<any>(AuthContext);
  const [games, setGames] = useState<IGameInformation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [featured, setFeatured] = useState<Game>();

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
      setFeatured(allGamesData[0]);
      setLoading(false);
    };
    fetchGames();
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <FeaturedGame game={featured} />
          <GameList games={games?.recommended} title="Recommended Games" />
          <GameList games={games?.allGames} title="Browse Games" />
        </div>
      )}
    </>
  );
};

export default Home;
