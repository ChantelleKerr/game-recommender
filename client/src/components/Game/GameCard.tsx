import { Card, Tag } from "antd";
import { useState } from "react";
import { Game, Genre } from "types";
import { FaStar } from "react-icons/fa6";

import RatingModal from "../Rating/RatingModal";
import { Button } from "antd";
import GamePlatforms from "./GamePlatforms";
import GameGenres from "./GameGenres";

const GameCard = ({ game }: { game: Game }) => {
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen ? (
        <RatingModal
          setIsModalOpen={setIsModalOpen}
          setHasRated={setHasRated}
          game={game}
        />
      ) : (
        <Card
          style={{
            width: 300,
            position: "relative",
            background: "#241e1e",
            border: "none",
          }}
          cover={
            <img
              alt="game-img"
              src={game.image}
              className="h-56 object-cover"
            />
          }
        >
          {hasRated && (
            <FaStar className="absolute top-2 right-2 text-accent text-2xl" />
          )}

          <h2 className="-ml-2 -mt-2 font-bold text-secondary">{game.name}</h2>
          <div className="flex flex-col justify-between -ml-2">
            <div className="flex flex-row justify-between">
              <GamePlatforms game={game} />
              {!hasRated && (
                <Button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="bg-primary text-white -mr-2 border-none text-[0.65rem] p-0 px-1.5 h-6"
                >
                  RATE ME
                </Button>
              )}
            </div>
            <GameGenres genres={game.genres} />
          </div>
        </Card>
      )}
    </>
  );
};

export default GameCard;
