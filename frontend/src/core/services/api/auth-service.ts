import type { IUser } from "@/core/types/user";
import BaseService from "./base-service";

class AuthService extends BaseService {
  async login(payload: any) {
    const res = await this.httpService.post<any>("/auth/login/", payload);
    return res;
  }

  async signup(payload: any) {
    const res = await this.httpService.post<any>("/auth/signup/", payload);
    return res;
  }

  async getUserDetailsByToken() {
    const res = await this.httpService.get<IUser | null>("/me");

    if (res.success) {
      return res.data;
    }

    return null;
  }
}

const authService = new AuthService();

export default authService;
