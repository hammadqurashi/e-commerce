import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import connectDB from "./lib/connectDb.js";
import globalErrorHandler from "./lib/global-error-handler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

configDotenv({ path: ".env" });

mongoose.set("strictQuery", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/auth", (await import("./routes/v1/auth/index.js")).default);

// admin routes
app.use("/api/v1/", (await import("./routes/v1/products.js")).default);

app.use(globalErrorHandler);

// connecting db
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on :${port}`);
});
