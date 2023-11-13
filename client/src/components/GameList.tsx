import { useState, useEffect } from "react";
import GameCard from "./GameCard";
import { Game } from "types";

const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);

  const getGames = async () => {
    try {
      const response = await fetch("games.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const gameData = data.results;
      setGames(gameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getGames();
  }, []);
  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-20">
      <h1 className="text-xl text-darkBlue"> Games List</h1>

      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
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
