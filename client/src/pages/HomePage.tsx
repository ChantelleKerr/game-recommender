import GameList from "../components/Game/GameList";
import GameService from "../services/game";
import RatingService from "../services/rating";
import { useContext, useEffect, useState } from "react";
import { Game, Rating } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import FeaturedGame from "../components/FeaturedGame";
import TopRatedGameList from "components/Game/TopRated/TopRatedGameList";

interface IGameInformation {
  allGames: Game[];
  recommended: Game[];
  ratedGames: Rating[];
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

      const ratedGameResponse = await RatingService.getRatings(user.user_id);
      const ratedGameData = ratedGameResponse.data;

      setGames({
        allGames: allGamesData,
        recommended: recommendedGamesData,
        ratedGames: ratedGameData,
      });

      const randomGameIndex = Math.floor(Math.random() * allGamesData.length);
      setFeatured(allGamesData[randomGameIndex]);
      setLoading(false);
    };
    fetchGames();
  }, []);
  return (
    <>
      {!loading && (
        <div>
          <FeaturedGame game={featured} />
          <TopRatedGameList />
          <GameList
            games={games?.recommended}
            title="Recommended Games"
            ratedGames={games?.ratedGames}
          />
          <GameList
            games={games?.allGames}
            title="Browse Games"
            ratedGames={games?.ratedGames}
          />
        </div>
      )}
    </>
  );
};

export default Home;
