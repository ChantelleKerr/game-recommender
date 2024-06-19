import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, AuthTokens } from "types";
import { AuthContext } from "context/AuthContext";

class AuthService {
  async login(userFormData: User, login: (tokenData: AuthTokens) => void) {
    const response = await axiosWithoutInterceptor.post(
      "/token/",
      userFormData
    );

    if (response.status == 200) {
      login(response.data);
    }
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
