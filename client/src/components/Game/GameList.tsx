import GameCard from "./GameCard";
import { Game, Rating } from "types";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

interface GameListProps {
  games: Game[];
  title: string;
  ratedGames: Rating[];
}

const GameList = ({ games, title, ratedGames }: GameListProps) => {
  const location = useLocation();
  const checkGameId = new Set(ratedGames.map((rating) => rating.game.id));
  let linkTo = title === "Browse Games" ? "browse" : "recommend";

  const getNoGamesAvailableText = () => {
    if (title === "Recommended Games") {
      return "You have no recommendations!";
    }
    return "There are no games available!";
  };

  const displayExploreAll = () => {
    if (location.pathname == "/") return true;
    return false;
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
      <Link to={`/${linkTo}`} className="flex group">
        <h1 className="text-lg text-secondary"> {title} </h1>
        {displayExploreAll() && (
          <span className="explore-all flex">
            Explore all
            <FaAngleRight className="ml-1 text-primary" />
          </span>
        )}
      </Link>

      {games && games.length === 0 ? (
        <p className="text-secondary/60 text-center py-11">
          {getNoGamesAvailableText()}
        </p>
      ) : (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center pb-6">
          {games &&
            games.map((game, index) => (
              <li key={index}>
                {checkGameId.has(game.id) ? (
                  <GameCard game={game} isRated={true} />
                ) : (
                  <GameCard game={game} isRated={false} />
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
