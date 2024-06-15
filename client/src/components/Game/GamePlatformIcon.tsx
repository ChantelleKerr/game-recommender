import { Game, Platform } from "types";
import {
  FaPlaystation,
  FaXbox,
  FaWindows,
  FaMobileScreen,
  FaStar,
} from "react-icons/fa6";
import { SiNintendoswitch } from "react-icons/si";

const GamePlatformIcon = ({ platform }: { platform: string }) => {
  const getIcon = () => {
    switch (platform) {
      case "Playstation":
        return <FaPlaystation className="text-secondary" />;
      case "Xbox":
        return <FaXbox className="text-secondary" />;
      case "Nintendo":
        return <SiNintendoswitch className="text-secondary" />;
      case "PC":
        return <FaWindows className="text-secondary" />;
      case "Mobile":
        return <FaMobileScreen className="text-secondary" />;
      default:
        return null;
    }
  };
  return <>{getIcon()}</>;
};

export default GamePlatformIcon;
