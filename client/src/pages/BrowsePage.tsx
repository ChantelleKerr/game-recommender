import GameList from "components/Game/GameList";
import GameService from "services/game";
import RatingService from "services/rating";
import { useContext, useEffect, useState } from "react";
import { Game, Rating } from "types";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

const BrowsePage = () => {
  const { user } = useContext<any>(AuthContext);

  const [games, setGames] = useState<Game[]>();
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
        const allGamesData = await GameService.getGames();
        const ratedGamesData = await RatingService.getRatings(user.user_id);

        setGames(allGamesData);
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
        <GameList games={games} title="Browse Games" ratedGames={ratedGames} />
      )}
    </div>
  );
};

export default BrowsePage;
