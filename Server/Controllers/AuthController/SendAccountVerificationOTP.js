import { generateOTP } from "../../Helper/GenerateOTP.js";
import userModel from "../../Models/User.js";

export const sendVerificationOTP = async (req, res) => {
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

    if (user.isAccountVerified)
      return res.status(200).json({
        message: `Account is already verified`,
        success: true,
      });

    const otp = generateOTP();

    user.accountVerificationOTP = otp;
    user.accountVerificationOTPExpireAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    res
      .status(201)
      .json({ message: `OTP Generated And Sent To Email`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error ${error.message}`,
      success: false,
    });
  }
};
