import type { AxiosInstance } from "axios";

export interface IApiClient extends AxiosInstance {}

export interface IHttpResponse<T> {
  data: T;
  success: boolean;
  msg: string;
}

export interface IReqAction<T> {
  type: string;
  payload: T;
}
