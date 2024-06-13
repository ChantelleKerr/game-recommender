import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";

class GameService {
  async getGames() {
    return axiosWithoutInterceptor.get("/api/game/get_games/");
  }

  async getRecommendedGames(user_id: number) {
    return axiosWithoutInterceptor.post(
      "/api/game/get_recommendation/" + user_id
    );
  }

  async getTopRatedGames() {
    return axiosWithoutInterceptor.get("/api/game/get_top_rated/");
  }
}
export default new GameService();
