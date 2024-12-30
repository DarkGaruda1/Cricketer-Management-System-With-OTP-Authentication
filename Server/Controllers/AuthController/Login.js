import userModel from "../../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDateAndTime } from "../../Helper/GetDateAndTime.js";

export const login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({
      success: false,
      message: `None of the required fields can be empty`,
    });

  try {
    const user = await userModel.findOne({ username, email });

    if (!user)
      return res.status(400).json({
        message: `Email ID or Username Not Associated With Any Account`,
        success: false,
      });

    const isPasswordMatch = bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        message: `Invalid Login Credentials`,
        success: false,
      });

    user.lastLogin = getDateAndTime();

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res
      .status(201)
      .json({ message: `User Logged In Successfully`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
