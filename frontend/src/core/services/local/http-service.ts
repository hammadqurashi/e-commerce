import ApiClient from "@/core/lib/api-client";
import jwtService from "./jwt-service";
import type { IApiClient, IHttpResponse } from "@/core/types";
// import { SIGNIN_ROUTE } from "@/core/routes";
import type { AxiosRequestConfig } from "axios";

export class HttpService {
  httpClient: IApiClient;

  constructor() {
    this.httpClient = ApiClient;

    this.setUpInterceptors();
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> {
    return this.httpClient
      .get(url, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          msg: err.response?.msg ?? "Something went wrong!",
        };
      });
  }

  post<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<IHttpResponse<T>> {
    return this.httpClient
      .post(url, payload, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          msg: err.response?.data?.msg ?? "Something went wrong!",
        };
      });
  }

  put<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<IHttpResponse<T>> {
    return this.httpClient
      .put(url, payload, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          msg: err.response?.data?.msg ?? "Something went wrong!",
        };
      });
  }

  patch<T>(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<IHttpResponse<T>> {
    return this.httpClient
      .patch(url, payload, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          success: false,
          msg: err.response?.data?.msg ?? "Something went wrong!",
        };
      });
  }

  delete<T>(url: string, config?: any): Promise<IHttpResponse<T>> {
    return this.httpClient
      .delete(url, config)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          success: false,
          msg: err.response?.data?.msg ?? "Something went wrong!",
        };
      });
  }

  setUpInterceptors() {
    this.httpClient.interceptors.request.use((config) => {
      const accessToken = jwtService.getAccessToken();

      // const url = config.url;

      // const toCheckRoutes =
      //   url.startsWith("/user") || url.startsWith("/booking");

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      }

      return config;
    });

    this.httpClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response?.status === 401) {
          jwtService.clearSession();
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
  }
}

const httpService = new HttpService();

export default httpService;
