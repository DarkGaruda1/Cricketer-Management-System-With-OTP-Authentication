import { validateEmail } from "../../Validations/EmailValidator.js";
import { validatePassword } from "../../Validations/PasswordValidator.js";
import { validateUsername } from "../../Validations/UsernameValidator.js";
import bcrypt from "bcryptjs";
import userModel from "../../Models/User.js";

export const signup = async (req, res) => {
  const { email, username, password, name } = req.body;

  if (!email || !username || !password || !name)
    return res.status(400).json({
      success: false,
      message: `None of the required fields can be empty`,
    });

  if (!validateEmail(email))
    return res.status(400).json({
      success: false,
      message: `Email id is not valid`,
    });

  if (!validateUsername(username))
    return res.status(400).json({
      success: false,
      message: `Username is not valid`,
    });

  if (!validatePassword(password))
    return res.status(400).json({
      success: false,
      message: `Password is not valid`,
    });

  try {
    // Check if email or username exists

    const emailExists = await userModel.findOne({ email });
    if (emailExists)
      return res.status(400).json({
        success: false,
        message: `An account with the same email already exists`,
      });
    const usernameExists = await userModel.findOne({ username });
    // Hash Password
    if (usernameExists)
      return res.status(400).json({
        message: `An account with the same username already exists`,
        success: false,
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: `New user successfully created`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
