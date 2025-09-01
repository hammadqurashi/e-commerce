import httpService, { HttpService } from '../local/http-service'

class BaseService {
  httpService: HttpService
  constructor() {
    this.httpService = httpService
  }
}

export default BaseService
