import React from "react";
import { Rating } from "types";
import RatingCard from "./RatingCard";

const RatingList = ({ ratings }: { ratings: Rating[] }) => {
  return (
    <div className=" flex flex-col justify-center mt-8 mx-4">
      <h1 className="text-lg text-darkBlue"> My rated games </h1>

      <ul className="grid gap-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-4">
        {ratings &&
          ratings.map((rating, index) => (
            <li key={index} className="flex justify-center">
              <RatingCard rating={rating} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default RatingList;
