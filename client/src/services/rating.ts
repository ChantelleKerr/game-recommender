import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, Rating } from "types";

class RatingService {
  async addRating(rating: Rating) {
    console.log(rating);
    return axiosInstance.post("/api/rating/create/", rating);
  }
}

export default new RatingService();
