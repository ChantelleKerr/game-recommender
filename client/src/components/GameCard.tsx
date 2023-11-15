import { Card, Tag } from "antd";
import { useState } from "react";
import { Game, Genre, Platform } from "types";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaLinux,
  FaApple,
  FaAndroid,
  FaRegStar,
  FaStar,
} from "react-icons/fa6";
import { SiNintendo } from "react-icons/si";
import RatingModal from "./RatingModal";
import { Button } from "antd";

const GameCard = ({ Game }: { Game: Game }) => {
  const [hasRated, setHasRated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getPlatformIcon = (platform: String) => {
    switch (platform) {
      case "PlayStation":
        return <FaPlaystation className="text-gray-600" />;
      case "Xbox":
        return <FaXbox className="text-gray-600" />;
      case "Nintendo":
        return <SiNintendo className="text-gray-600" />;
      case "PC":
        return <FaWindows className="text-gray-600" />;
      case "Apple Macintosh":
        return <FaApple className="text-gray-600" />;
      case "Linux":
        return <FaLinux className="text-gray-600" />;
      case "Android":
        return <FaAndroid className="text-gray-600" />;
      default:
        return null;
    }
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
          {hasRated && (
            <FaStar className="absolute top-2 right-2 text-accent text-2xl" />
          )}

          <h2 className="-ml-2 -mt-2 text-md">{Game.name}</h2>
          <div className="flex flex-col justify-between">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row justify-between mt-2 -ml-2">
                {Game.parent_platforms.map((plat: Platform, index) => (
                  <span key={index} className="pr-1">
                    {getPlatformIcon(plat.platform.name)}
                  </span>
                ))}
              </div>
              {!hasRated && (
                <Button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="bg-primary text-white -mr-2 border-none text-[0.65rem] p-0 px-1.5 h-6"
                >
                  RATE ME
                </Button>
              )}
            </div>

            <div className="flex flex-wrap -ml-2 z-0">
              {Game.genres.map((genre: Genre) => (
                <Tag
                  key={genre.name}
                  className="rounded-lg mt-2 static bg-primary/10 border-primary text-primary text-[0.6rem] p-0 h-4 px-1 leading-snug"
                >
                  {genre.name}
                </Tag>
              ))}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default GameCard;
