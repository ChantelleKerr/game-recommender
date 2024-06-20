import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, AuthTokens } from "types";

class AuthService {
  async login(userFormData: User, login: (tokenData: AuthTokens) => void) {
    const res = await axiosWithoutInterceptor.post(
      "/auth/token/",
      userFormData
    );

    if (res.status == 200) {
      login(res.data);
    }
  }

  async signup(userData: User) {
    const res = await axiosWithoutInterceptor.post("/auth/register/", userData);
  }
  async signout(logout: () => void, authTokens: AuthTokens) {
    const res = await axiosInstance.post("/auth/logout/", {
      refresh_token: authTokens.refresh,
    });
    if (res.status == 200) logout();
  }
}

export default new AuthService();
