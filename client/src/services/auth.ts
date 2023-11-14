import axiosWithoutInterceptor, { axiosInstance } from "./axiosInterceptor";
import { User } from "types";

class AuthService {
  login(credentials: User) {
    return axiosWithoutInterceptor.post("/api/user/login/", credentials);
  }

  signup(userData: any) {
    return axiosWithoutInterceptor.post("/api/user/register/", userData);
  }
  signout() {
    console.log("Logout");
  }
}

export default new AuthService();
