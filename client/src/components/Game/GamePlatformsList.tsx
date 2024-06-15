import { Game, Platform } from "types";

import GamePlatformIcon from "./GamePlatformIcon";

const GamePlatformsList = ({ platforms }: { platforms: Platform[] }) => {
  console.log("Game platforms:", platforms);

  return (
    <div className="flex flex-row justify-between items-center">
      {platforms.map((platform, index) => (
        <span key={index} className="pr-1">
          <GamePlatformIcon platform={platform.name} />
        </span>
      ))}
    </div>
  );
};

export default GamePlatformsList;
