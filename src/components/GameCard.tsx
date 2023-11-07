import React, { useState, useEffect } from "react";
import { Game, Genre, Platform } from "types";
import {
  FaPlaystation,
  FaXbox,
  FaComputer,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { SiNintendo } from "react-icons/si";
import { PlatformPath } from "node:path/posix";

const GameCard = ({ Game }: { Game: Game }) => {
  const [favourite, setFavourite] = useState(false);

  const updateFavourite = () => {
    // TODO: Store favourite onload
    setFavourite(!favourite);
  };

  const getPlatformIcon = (platform: String) => {
    if (platform === "PlayStation") {
      return <FaPlaystation />;
    } else if (platform === "Xbox") {
      return <FaXbox />;
    } else if (platform === "Nintendo") {
      return <SiNintendo />;
    } else if (platform === "PC") {
      return <FaComputer />;
    }
  };

  const getHeartIcon = () => {
    return favourite ? (
      <FaHeart
        className="absolute top-2 right-2 text-accent text-4xl"
        onClick={updateFavourite}
      />
    ) : (
      <FaRegHeart
        className="absolute top-2 right-2 text-accent text-4xl"
        onClick={updateFavourite}
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
