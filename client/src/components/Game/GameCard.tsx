import { Card, Tag } from "antd";
import { useState } from "react";
import { Game, Genre } from "types";
import { FaStar } from "react-icons/fa6";

import RatingModal from "../Rating/RatingModal";
import { Button } from "antd";
import GamePlatformsList from "./GamePlatformsList";
import GameGenres from "./GameGenres";

interface IGameCardProps {
  game: Game;
  isRated: boolean;
}

const GameCard = ({ game, isRated }: IGameCardProps) => {
  const [hasRated, setHasRated] = useState<boolean>(isRated);
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
            <div className="bg-dark p-2 absolute top-0 right-2 rounded-b-md">
              <FaStar className=" text-primary text-2xl" />
            </div>
          )}

          <h2 className="-ml-2 -mt-2 font-bold text-secondary">{game.name}</h2>
          <div className="flex flex-col justify-between -ml-2">
            <div className="flex flex-row justify-between">
              <GamePlatformsList platforms={game.platforms} />
              {!hasRated && (
                <Button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="bg-primary text-white -mr-2 border-none text-[0.75rem] p-0 px-4 h-8 ant-custom-button m-2"
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
