import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User, AuthTokens } from "types";
import axios from "axios";

class AuthService {
  async login(userFormData: User, login: (tokenData: AuthTokens) => void) {
    try {
      const res = await axiosWithoutInterceptor.post(
        "/auth/token/",
        userFormData
      );
      login(res.data);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: "An error occurred with login, please try again",
      };
    }
  }

  async signup(userData: User) {
    try {
      const res = await axiosWithoutInterceptor.post(
        "/auth/register/",
        userData
      );
      return { success: true, data: res.data };
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorData = error.response.data;
        let message = "An error occurred during signup";

        if (errorData.username) {
          message = errorData.username[0];
        } else if (errorData.email) {
          message = "Email must be unique";
        }

        return {
          success: false,
          message: message,
        };
      } else {
        return { success: false, message: "An error occurred during signup" };
      }
    }
  }
  async signout(logout: () => void, authTokens: AuthTokens) {
    const res = await axiosInstance.post("/auth/logout/", {
      refresh_token: authTokens.refresh,
    });
    if (res.status == 200) logout();
  }
}

export default new AuthService();
