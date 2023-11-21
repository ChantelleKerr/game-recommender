import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Game } from "types";

interface GameListProps {
  games: Game[];
  title: string;
}

const GameList = ({ games, title }: GameListProps) => {
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-20">
      <h1 className="text-lg text-darkBlue"> {title} </h1>

      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center pb-6">
        {games &&
          games.map((game, index) => (
            <li key={index}>
              <GameCard game={game} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GameList;
