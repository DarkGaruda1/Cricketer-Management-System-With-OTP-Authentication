import bcrypt from "bcryptjs";
import userModel from "../../Models/User.js";
export const resetPassword = async (req, res) => {
  const { userID, newPassword, OTP } = req.body;

  if (!userID)
    return res
      .status(401)
      .json({ message: `Unauthorized! Login Again`, success: false });

  if (!newPassword || !OTP)
    return res.status(400).json({
      message: `None of the required fields can be empty`,
      success: false,
    });

  if (!userID)
    return res
      .status(401)
      .json({ message: `Unauthorized! Login Again`, success: false });

  try {
    const user = await userModel.findById(userID);
    const isPasswordMatch = await bcrypt.compare(newPassword, user.password);

    if (isPasswordMatch)
      return res.status(400).json({
        message: `New Password cannot be the same as your old password`,
        success: false,
      });

    if (user.passwordResetOTP !== OTP || userID.passwordResetOTP === "")
      return res
        .status(400)
        .json({ message: `OTP is invalid`, success: false });

    if (Date.now() > user.passwordResetOTPExpireAt)
      return res
        .status(400)
        .json({ message: `OTP Expired. Please verify again`, success: false });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    user.passwordResetOTP = "";
    user.passwordResetOTPExpireAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ message: `Password reset successful`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error ${error.message}`,
      success: false,
    });
  }
};
