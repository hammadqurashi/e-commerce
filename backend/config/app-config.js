import { configDotenv } from "dotenv";

configDotenv({ path: ".env" });

const AppConfig = {
  adminEmail: "admin@dotclick.com",
  jwtSecret: process.env.JWT_SECRET,
  appOrigin: process.env.APP_ORIGIN,
  mongoUri: process.env.MONGO_URI,
  dbName: "dot_click_test_ecommerce",
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  frontendOrigin: process.env.FRONTEND_ORIGIN,
};

export default AppConfig;
