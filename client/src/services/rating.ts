import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, Rating } from "types";

const endpoint = "rating";
class RatingService {
  async addRating(rating: Rating) {
    const response = await axiosInstance.post(`/${endpoint}/create/`, rating);
    return response.data;
  }

  async getRatings(user_id: number) {
    const response = await axiosInstance.get(`/${endpoint}/get/` + user_id);
    return response.data;
  }
}

export default new RatingService();
