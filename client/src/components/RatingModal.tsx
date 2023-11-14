import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Game, Genre, Platform } from "types";
import { Rate, Select, Button } from "antd";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasRated: React.Dispatch<React.SetStateAction<boolean>>;
  Game: Game;
};
const RatingModal = ({ setIsModalOpen, setHasRated, Game }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [platform, setPlatform] = useState<string>("Playstation");
  const options: any = [
    "Playstation",
    "Xbox",
    "PC",
    "Nintendo",
    "Apple Macintosh",
    "Linux",
    "Android",
  ];

  return (
    <div
      className="bg-white rounded-xl"
      style={{
        width: 300,
        height: 339,
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      <div className="flex justify-end p-5">
        <RiCloseLine
          onClick={() => setIsModalOpen(false)}
          className="cursor-pointer"
        />
      </div>
      <div className=" flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-dark">What is your rating?</h1>
          <h2 className="text-darkGray"> {Game.name}</h2>
        </div>
        <Rate allowHalf defaultValue={0} onChange={setRating} value={rating} />
        <div className=" flex flex-col items-center gap-2">
          <label className="text-darkGray text-xs">
            Which platform did you use?
          </label>
          <Select
            defaultValue={platform}
            onChange={(value) => setPlatform(value)}
            style={{ width: 200 }}
            options={options.map((option: any) => ({
              value: option,
              label: option,
            }))}
          />
        </div>
        <div className="px-4 w-full mb-6 flex gap-1">
          <Button
            type="primary"
            block
            className="bg-primary text-dark"
            onClick={() => setHasRated(true)}
          >
            Submit
          </Button>
          <Button
            block
            className="border-accent text-accent"
            onClick={() => setHasRated(false)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
