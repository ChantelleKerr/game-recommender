import React, { useState, useEffect } from "react";
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

  const updateRated = () => {
    // TODO: Store favourite onload
    setIsModalOpen(!isModalOpen);
  };

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
    <div className="card flex-1 bg-primary shadow-xl max-w-lg">
      <figure>
        <img
          src={Game.background_image}
          alt="Game"
          className="w-full h-60 object-cover object-top"
        />
        {getHeartIcon()}
      </figure>
      {isModalOpen && (
        <RatingModal
          setIsModalOpen={setIsModalOpen}
          setHasRated={setHasRated}
          Game={Game}
        />
      )}
      <div className="card-body p-5">
        <h2 className="card-title pb-3 text-secondary">{Game.name}</h2>
        <div className="card-actions justify-end">
          {Game.parent_platforms.map((plat: Platform, index) => (
            <span key={index}>{getPlatformIcon(plat.platform.name)}</span>
          ))}
        </div>

        <div className="card-actions justify-end">
          {Game.genres.map((genre: Genre) => (
            <div className="badge badge-outline" key={genre.name}>
              {genre.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default GameCard;
