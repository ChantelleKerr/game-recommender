import GameList from "components/Game/GameList";
import GameService from "services/game";
import RatingService from "services/rating";
import { useContext, useEffect, useState } from "react";
import { Game, Rating } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import FeaturedGame from "components/FeaturedGame";
import TopRatedGameList from "components/Game/TopRated/TopRatedGameList";

const RecommendedPage = () => {
  const { user } = useContext<any>(AuthContext);

  const [recommendedGames, setRecommendedGames] = useState<Game[]>();
  const [ratedGames, setRatedGames] = useState<Rating[]>();

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
        const recommendedGamesData = await GameService.getRecommendedGames(
          user.user_id
        );
        const ratedGamesData = await RatingService.getRatings(user.user_id);

        setRecommendedGames(recommendedGamesData);
        setRatedGames(ratedGamesData);
      }
      setLoading(false);
    };
    fetchGames();
    return () => {
      isMounted = false;
    };
  }, [user]);
  return (
    <div className="pt-24">
      {!loading && (
        <GameList
          games={recommendedGames}
          title="Recommended Games"
          ratedGames={ratedGames}
        />
      )}
    </div>
  );
};

export default RecommendedPage;
