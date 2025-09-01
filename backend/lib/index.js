import mongoose from "mongoose";
import AppConfig from "../config/app-config";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Mongodb already connected");
  } else {
    mongoose
      .connect(AppConfig.mongoUri, {
        dbName: AppConfig.dbName,
      })
      .then(() => console.log("Mongodb connected successfully!"))
      .catch((err) =>
        console.log("Something went wrong in connecting Mongodb", err)
      );
  }
};

export * from ".";
