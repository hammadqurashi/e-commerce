import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      required: [true, "User role is required!"],
      enum: ["admin", "user"],
      default: "user",
    },
    userName: { type: String, default: "" },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required!"] },
    isVerified: { type: Boolean, default: false },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
      unique: true,
    },
    profileImg: { type: String, default: null },
    stripeCustomerId: { type: String, default: null },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
