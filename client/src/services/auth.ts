import axiosWithoutInterceptor from "./axiosInterceptor";
import { User } from "types";

class AuthService {
  login(credentials: User) {
    return axiosWithoutInterceptor.post("/api/user/login/", credentials);
  }

  signup(userData: any) {
    return axiosWithoutInterceptor.post("/api/user/register/", userData);
  }
}

export default new AuthService();
