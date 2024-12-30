import { generateOTP } from "../../Helper/GenerateOTP.js";
import userModel from "../../Models/User.js";

export const sendPasswordResetOTP = async (req, res) => {
  const { userID } = req.body;

  if (!userID)
    return res
      .status(401)
      .json({ message: `Unauthorized! Login Again`, success: false });

  try {
    const user = await userModel.findById(userID);

    if (!user)
      return res.status(401).json({
        message: `Something Went Wrong. Bad Cookie`,
        success: false,
      });

    const otp = generateOTP();

    user.passwordResetOTP = otp;
    user.passwordResetOTPExpireAt = Date.now() + 15 * 60 * 1000;

    await user.save();
    return res
      .status(201)
      .json({ message: `OTP generated and sent to Email ID`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error ${error.message}`,
      success: false,
    });
  }
};
