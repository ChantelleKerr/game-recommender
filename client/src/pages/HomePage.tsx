import GameList from "../components/Game/GameList";
import GameService from "../services/game";
import RatingService from "../services/rating";
import { useContext, useEffect, useState } from "react";
import { Game, Rating } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import FeaturedGame from "../components/FeaturedGame";
import TopRatedGameList from "components/Game/TopRated/TopRatedGameList";

const Home = () => {
  const { user } = useContext<any>(AuthContext);

  const [games, setGames] = useState<Game[]>();
  const [recommendedGames, setRecommendedGames] = useState<Game[]>();
  const [ratedGames, setRatedGames] = useState<Rating[]>();
  const [featured, setFeatured] = useState<Game>();

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    let isMounted = true;

    const fetchGames = async () => {
      if (isMounted) {
        const allGamesData = await GameService.getGames();
        const recommendedGamesData = await GameService.getRecommendedGames(
          user.user_id
        );
        const ratedGamesData = await RatingService.getRatings(user.user_id);

        setGames(allGamesData);
        setRecommendedGames(recommendedGamesData);
        setRatedGames(ratedGamesData);

        const randomGameIndex = Math.floor(Math.random() * allGamesData.length);
        setFeatured(allGamesData[randomGameIndex]);
      }
      setLoading(false);
    };
    fetchGames();
    return () => {
      isMounted = false;
    };
  }, [user]);
  return (
    <>
      {!loading && (
        <>
          <FeaturedGame game={featured} />
          <TopRatedGameList />
          <GameList
            games={recommendedGames}
            title="Recommended Games"
            ratedGames={ratedGames}
          />
          <GameList
            games={games}
            title="Browse Games"
            ratedGames={ratedGames}
          />
        </>
      )}
    </>
  );
};

export default Home;
