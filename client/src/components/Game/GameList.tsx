import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Game } from "types";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

interface GameListProps {
  games: Game[];
  title: string;
  ratedGames: [];
}

const GameList = ({ games, title, ratedGames }: GameListProps) => {
  const checkGameId = new Set(ratedGames.map((rating) => rating.game.id));
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
      <Link to="/recommended" className="flex group">
        <h1 className="text-lg text-secondary"> {title} </h1>

        <span className="explore-all flex">
          Explore all
          <FaAngleRight className="ml-1 text-primary" />
        </span>
      </Link>

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
    </div>
  );
};

export default GameList;
