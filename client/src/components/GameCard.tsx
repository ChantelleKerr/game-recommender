import { Card, Tag } from "antd";
import { useState } from "react";
import { Game, Genre, Platform } from "types";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaHeart,
  FaRegHeart,
  FaLinux,
  FaApple,
  FaAndroid,
} from "react-icons/fa6";
import { SiNintendo } from "react-icons/si";
import RatingModal from "./RatingModal";

const GameCard = ({ Game }: { Game: Game }) => {
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getPlatformIcon = (platform: String) => {
    switch (platform) {
      case "PlayStation":
        return <FaPlaystation />;
      case "Xbox":
        return <FaXbox />;
      case "Nintendo":
        return <SiNintendo />;
      case "PC":
        return <FaWindows />;
      case "Apple Macintosh":
        return <FaApple />;
      case "Linux":
        return <FaLinux />;
      case "Android":
        return <FaAndroid />;
      default:
        return null;
    }
  };

  const getHeartIcon = () => {
    return hasRated ? (
      <FaHeart
        className="absolute top-2 right-2 text-accent text-4xl"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    ) : (
      <FaRegHeart
        className="absolute top-2 right-2 text-accent text-4xl"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    );
  };

  return (
    <>
      {isModalOpen ? (
        <RatingModal
          setIsModalOpen={setIsModalOpen}
          setHasRated={setHasRated}
          Game={Game}
        />
      ) : (
        <Card
          style={{ width: 300, position: "relative" }}
          cover={
            <img
              alt="game-img"
              src={Game.background_image}
              className="h-56 object-cover"
            />
          }
        >
          {isModalOpen && (
            <RatingModal
              setIsModalOpen={setIsModalOpen}
              setHasRated={setHasRated}
              Game={Game}
            />
          )}
          {getHeartIcon()}

          <h2 className="-ml-2 -mt-2 text-md">{Game.name}</h2>
          <div className="flex flex-row justify-end mt-2 -mr-2">
            {Game.parent_platforms.map((plat: Platform, index) => (
              <span key={index} className="pr-1">
                {getPlatformIcon(plat.platform.name)}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-end -mr-3 z-0">
            {Game.genres.map((genre: Genre) => (
              <Tag
                color="default"
                key={genre.name}
                className="rounded-lg mt-2 static"
              >
                {genre.name}
              </Tag>
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default GameCard;
