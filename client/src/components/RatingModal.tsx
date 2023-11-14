import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Game, Genre, Platform } from "types";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasRated: React.Dispatch<React.SetStateAction<boolean>>;
  Game: Game;
};
const RatingModal = ({ setIsModalOpen, setHasRated, Game }: Props) => {
  const [rating, setRating] = useState(null);
  return (
    <div className="bg-white h-full w-full absolute rounded-2xl">
      <div className="flex justify-end m-5">
        <RiCloseLine onClick={() => setIsModalOpen(false)} />
      </div>
      <div className=" flex flex-col items-center justify-between h-80">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-darkBlue">What is your rating?</h1>
          <h2 className="text-primary"> {Game.name}</h2>
        </div>

        <div className="rating gap-1 ">
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-red-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-orange-400"
            checked
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-yellow-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-lime-400"
          />
          <input
            type="radio"
            name="rating-3"
            className="mask mask-heart bg-green-400"
          />
        </div>
        <button
          type="submit"
          onClick={() => setHasRated(true)}
          className="btn btn-wide bg-accent text-darkBlue my-8"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
