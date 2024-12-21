import { useContext, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { Game, Genre, Platform, Rating } from "types";
import { Rate, Select, Button, Form, Spin } from "antd";
import { AuthContext } from "context/AuthContext";
import RatingService from "services/rating";
import useNotification from "hooks/notifications";

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHasRated: React.Dispatch<React.SetStateAction<boolean>>;
  game: Game;
};
const RatingModal = ({ setIsModalOpen, setHasRated, game }: Props) => {
  let { user } = useContext<any>(AuthContext);
  const { notifySuccess } = useNotification();

  const initialValue: Rating = {
    user: user.user_id,
    game: game.id,
    rating: 0,
    platform: "",
  };
  const [ratingForm, setRatingForm] = useState<Rating>(initialValue);
  const [isLoading, setLoading] = useState<boolean>(false);

  const availablePlatforms = (game.platforms ?? []).map(
    (platform) => platform.name
  );

  const handleChange = <T extends string | number>(name: string, value: T) => {
    setRatingForm((prevRatingForm) => ({
      ...prevRatingForm,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    await RatingService.addRating(ratingForm);
    setHasRated(true);
    setLoading(false);
    setIsModalOpen(false);
    notifySuccess({
      message: "Success",
      description: "You successfully added a new rating!",
    });
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
        height: 365,
      }}
    >
      {!isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <div className="flex justify-end p-5">
            <RiCloseLine
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer text-secondary"
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
                  options={availablePlatforms.map((option: any) => ({
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
      ) : (
        <div className="flex justify-center items-center h-full">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default RatingModal;
