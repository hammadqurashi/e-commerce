import { v2 as cloudinary } from "cloudinary";
import CloudinaryConfig from "../config/cloudinary-config.js";

cloudinary.config({
  cloud_name: CloudinaryConfig.cloudName,
  api_key: CloudinaryConfig.apiKey,
  api_secret: CloudinaryConfig.apiSecret,
});

export default cloudinary;
