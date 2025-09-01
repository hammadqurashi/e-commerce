import Cookies from "js-cookie";

class CookieService {
  set(name: string, value: string, options?: Cookies.CookieAttributes) {
    Cookies.set(name, value, options);
  }

  get(name: string) {
    return Cookies.get(name);
  }

  remove(name: string) {
    Cookies.remove(name);
  }

  getAll() {
    return Cookies.get();
  }
}

const cookieService = new CookieService();

export default cookieService;
