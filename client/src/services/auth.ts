import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User } from "types";
import { AuthContext } from "context/AuthContext";

class AuthService {
  async login(credentials: User) {
    return axiosWithoutInterceptor.post("/token/", credentials);
  }

  signup(userData: any) {
    return axiosWithoutInterceptor.post("/user/register/", userData);
  }
  async signout(logout: () => void, authTokens: any) {
    const res = await axiosInstance.post("/logout/", {
      refresh_token: authTokens.refresh,
    });
    if (res.status == 200) logout();
  }
}

export default new AuthService();
