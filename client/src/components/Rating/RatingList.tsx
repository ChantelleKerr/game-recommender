import { Rating } from "types";
import RatingCard from "./RatingCard";

const RatingList = ({
  ratings,
  onDeleteRating,
}: {
  ratings: Rating[];
  onDeleteRating: (ratingId: number) => void;
}) => {
  return (
    <div className="flex flex-col justify-center mt-8 mx-4">
      <h1 className="text-lg text-secondary">My Rated Games</h1>
      {ratings.length === 0 ? (
        <p className="text-secondary/60 text-center">
          You have no game ratings!
        </p>
      ) : (
        <ul className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
          {ratings.map((rating, index) => (
            <li key={index} className="flex justify-center">
              <RatingCard rating={rating} onDelete={onDeleteRating} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RatingList;
