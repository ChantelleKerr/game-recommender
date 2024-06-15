import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";

const endpoint = "game";
class GameService {
  async getGames() {
    const response = await axiosWithoutInterceptor.get(
      `/${endpoint}/get_games/`
    );
    return response.data;
  }

  async getRecommendedGames(user_id: number) {
    const response = await axiosWithoutInterceptor.post(
      `/${endpoint}/get_recommendation/` + user_id
    );
    return response.data;
  }

  async getTopRatedGames() {
    const response = await axiosWithoutInterceptor.get(
      `/${endpoint}/get_top_rated/`
    );
    return response.data;
  }
}
export default new GameService();
