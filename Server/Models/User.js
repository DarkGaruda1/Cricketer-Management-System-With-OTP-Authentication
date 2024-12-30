import mongoose from "mongoose";
import { getDateAndTime } from "../Helper/GetDateAndTime.js";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  isAccountVerified: { type: Boolean, default: false },
  accountVerificationOTP: { type: String, default: "" },
  accountVerificationOTPExpireAt: { type: Number, default: 0 },
  passwordResetOTP: { type: String, default: "" },
  passwordResetOTPExpireAt: { type: Number, default: 0 },

  accountCreated: { type: String, default: getDateAndTime() },
  accountLastUpdated: { type: String, default: "" },
  lastLogin: { type: String, default: "" },
});

const userModel = new mongoose.model("User", userSchema);

export default userModel;
