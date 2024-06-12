import { useContext, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Game, Genre, Platform, Rating } from "types";
import { Rate, Select, Button, Form } from "antd";
import { AuthContext } from "context/AuthContext";
import RatingService from "services/rating";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasRated: React.Dispatch<React.SetStateAction<boolean>>;
  game: Game;
};
const RatingModal = ({ setIsModalOpen, setHasRated, game }: Props) => {
  let { user } = useContext<any>(AuthContext);
  const initialValue: Rating = {
    user: user.user_id,
    game: game.id,
    rating: 0,
    platform: "",
  };
  const [ratingForm, setRatingForm] = useState<Rating>(initialValue);
  const options: any = ["Playstation", "Xbox", "PC", "Nintendo"];

  const handleChange = <T extends string | number>(name: string, value: T) => {
    setRatingForm((prevRatingForm) => ({
      ...prevRatingForm,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    const res = await RatingService.addRating(ratingForm);
  };

  const handleChangeRate = (value: number) => {
    handleChange("rating", value);
  };

  const handleChangeSelect = (value: string) => {
    handleChange("platform", value);
  };

  return (
    <div
      className="bg-dark rounded-xl"
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
      <Form
        onFinish={handleSubmit}
        className=" flex flex-col items-center justify-between"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-2xl text-dark">What is your rating?</h1>
          <h2 className="text-secondary"> {game.name}</h2>
        </div>
        <Form.Item<Rating> name="rating">
          <Rate
            allowHalf
            value={ratingForm.rating}
            onChange={handleChangeRate}
            style={{ color: "text-secondary" }}
          />
        </Form.Item>
        <div className=" flex flex-col items-center gap-2">
          <label className="text-secondary text-xs">
            Which platform did you use?
          </label>
          <Form.Item<Rating> name="platform">
            <Select
              onChange={handleChangeSelect}
              style={{ width: 200 }}
              options={options.map((option: any) => ({
                value: option,
                label: option,
              }))}
            />
          </Form.Item>
        </div>
        <Form.Item className="px-4 w-full mb-6">
          <Button
            htmlType="submit"
            name="rating"
            type="primary"
            block
            className="bg-primary text-white ant-custom-button"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RatingModal;
