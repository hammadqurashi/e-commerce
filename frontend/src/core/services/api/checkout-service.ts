import BaseService from "./base-service";

class CheckoutService extends BaseService {
  async createCheckoutSession(payload: any) {
    const res = await this.httpService.post<any>("/create-checkout/", payload);
    return res;
  }
}

const checkoutService = new CheckoutService();

export default checkoutService;
