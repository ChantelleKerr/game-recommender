import { useContext, useEffect, useState } from "react";
import { Rating } from "types";
import RatingService from "services/rating";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import RatingList from "components/Rating/RatingList";

const RatingsPage = () => {
  const [ratings, setRatings] = useState<Rating[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext<any>(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    const fetchRatings = async () => {
      const ratingData = await RatingService.getRatings(user.user_id);
      setRatings(ratingData);
      setLoading(false);
    };
    fetchRatings();
  }, []);
  return (
    <div className="pt-10">{ratings && <RatingList ratings={ratings} />}</div>
  );
};

export default RatingsPage;
