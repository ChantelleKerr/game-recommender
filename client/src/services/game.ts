import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";

class GameService {
  async getGames() {
    return axiosWithoutInterceptor.get("/api/game/get_games/");
  }
}
export default new GameService();
