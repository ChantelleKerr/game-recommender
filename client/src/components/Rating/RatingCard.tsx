import GameGenres from "components/Game/GameGenres";
import GamePlatformIcon from "components/Game/GamePlatformIcon";
import { FaTrash } from "react-icons/fa";
import { Rating } from "types";

const RatingCard = ({
  rating,
  onDelete,
}: {
  rating: Rating;
  onDelete: (ratingId: number) => void;
}) => {
  const handleDelete = () => {
    onDelete(rating.id);
  };
  return (
    <div className="flex bg-dark h-28 w-full rounded-md">
      <div className="flex justify-center items-center w-2/3 relative">
        <div className="absolute inset-0 bg-black opacity-40 rounded-l-md"></div>
        <div className="absolute flex flex-col items-center ">
          <span className=" text-6xl text-secondary ">{rating.rating}</span>
          <p className="text-secondary text-xs">RATING</p>
        </div>

        <img
          className="object-cover w-full h-full rounded-l-md"
          src={rating.game.image}
        />
      </div>
      <div className="m-2 w-full">
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-secondary"> {rating.game.name}</h2>
          <FaTrash
            className="text-primary/60 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-between">
            <GamePlatformIcon platform={rating.platform} />
          </div>
          <GameGenres genres={rating.game.genres} />
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
