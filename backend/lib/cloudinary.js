import { v2 } from "cloudinary";
import CloudinaryConfig from "../config/cloudinary-config.js";

const cloudinary = v2.config({
  cloud_name: CloudinaryConfig.cloudName,
  api_key: CloudinaryConfig.apiKey,
  api_secret: CloudinaryConfig.apiSecret,
});

export default cloudinary;
