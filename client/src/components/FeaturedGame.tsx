import { Button } from "antd";
import React from "react";
import { Game } from "types";

const FeaturedGame = ({ game }: { game: Game }) => {
  return (
    <div>
      {game && (
        <div className="relative">
          <div className="image-container">
            <div className="gradient-side"></div>
            <img
              alt="game-img"
              src={game.image}
              className="object-cover w-full max-h-screen "
            />
          </div>
          <h1 className="text-secondary absolute bottom-9 sm:text-2xl md:text-4xl lg:text-6xl px-5 sm:px-10">
            {game.name}
          </h1>
        </div>
      )}
    </div>
  );
};

export default FeaturedGame;
