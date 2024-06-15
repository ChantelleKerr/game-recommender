import { useContext } from "react";
import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User } from "types";

class AuthService {
  async login(credentials: User) {
    return axiosWithoutInterceptor.post("/token/", credentials);
  }

  signup(userData: any) {
    return axiosWithoutInterceptor.post("/user/register/", userData);
  }
  signout() {
    console.log("Logout");
  }
}

export default new AuthService();
