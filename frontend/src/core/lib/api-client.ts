import axios from "axios";
import { AppConfig } from "../config";

const ApiClient = axios.create({
  baseURL: `${AppConfig.apiUrl}/api/v1`,
});

export default ApiClient;
