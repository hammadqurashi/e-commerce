import { AppConfig } from "@/core/config";
import cookieService from "./cookie-service";
import type { IAuthSession } from "@/core/types";

class JWTService {
  getAccessToken() {
    const session = cookieService.get(AppConfig.authSession);

    if (session) {
      return JSON.parse(session).accessToken;
    }

    return null;
  }

  getRefreshToken() {
    const session = cookieService.get(AppConfig.authSession);

    if (session) {
      return JSON.parse(session).refreshToken;
    }

    return null;
  }

  setAuthSession(authSession: IAuthSession) {
    cookieService.set(AppConfig.authSession, JSON.stringify(authSession));
  }

  updateAuthSession(authSession: IAuthSession) {
    const previousSession = cookieService.get(AppConfig.authSession);

    if (previousSession) {
      const parsedSession = JSON.parse(previousSession);
      this.setAuthSession({ ...parsedSession, ...authSession });
    } else {
      this.setAuthSession({ ...authSession });
    }
  }

  getAuthSession() {
    const session = cookieService.get(AppConfig.authSession);

    if (session) {
      return JSON.parse(session);
    }
  }

  clearSession() {
    cookieService.remove(AppConfig.authSession);
  }
}

const jwtService = new JWTService();

export default jwtService;
