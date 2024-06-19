import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, Rating } from "types";

const endpoint = "rating";
class RatingService {
  async addRating(rating: Rating) {
    await axiosInstance.post(`/${endpoint}/create/`, rating);
  }

  async getRatings(user_id: number) {
    const response = await axiosInstance.get(`/${endpoint}/get/` + user_id);
    return response.data;
  }

  async deleteRating(id: number) {
    const response = await axiosInstance.delete(`/${endpoint}/delete/` + id);
  }
}

export default new RatingService();
