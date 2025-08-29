import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

// connecting db
connectDB();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on :${port}`);
});
