import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, Rating } from "types";

class RatingService {
  async addRating(rating: Rating) {
    return axiosInstance.post("/api/rating/create/", rating);
  }

  async getRatings(user_id: number) {
    return axiosInstance.get("/api/rating/get/" + user_id);
  }
}

export default new RatingService();
