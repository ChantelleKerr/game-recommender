import { Game, Platform } from "types";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaMobileScreen,
  FaStar,
} from "react-icons/fa6";
import { SiNintendoswitch } from "react-icons/si";
const GamePlatforms = ({ game }: { game: Game }) => {
  const getPlatformIcon = (platform: String) => {
    switch (platform) {
      case "Playstation":
        return <FaPlaystation className="text-gray-600" />;
      case "Xbox":
        return <FaXbox className="text-gray-600" />;
      case "Nintendo":
        return <SiNintendoswitch className="text-gray-600" />;
      case "PC":
        return <FaWindows className="text-gray-600" />;
      case "Mobile":
        return <FaMobileScreen className="text-gray-600" />;
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-row justify-between mt-2">
      {game.platforms.map((platforms: Platform, index) => (
        <span key={index} className="pr-1">
          {getPlatformIcon(platforms.name)}
        </span>
      ))}
    </div>
  );
};

export default GamePlatforms;
