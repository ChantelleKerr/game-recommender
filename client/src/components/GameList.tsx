import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Game } from "types";

interface GameListProps {
  games: Game[];
}

const GameList = ({ games }: GameListProps) => {
  console.log("OI");
  console.log(games);
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-20">
      <h1 className="text-lg text-darkBlue"> Games List</h1>

      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center pb-6">
        {games &&
          games.map((game, index) => (
            <li key={index}>
              <GameCard Game={game} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default GameList;
