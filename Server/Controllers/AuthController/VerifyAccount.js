import userModel from "../../Models/User.js";

export const verifyAccount = async (req, res) => {
  const { OTP, userID } = req.body;

  if (!OTP)
    return res
      .status(400)
      .json({ message: `OTP cannot be empty`, success: false });

  if (!userID)
    return res
      .status(401)
      .json({ message: `Unauthorized! Login Again`, success: false });

  try {
    const user = await userModel.findById(userID);

    if (
      user.accountVerificationOTP !== OTP ||
      user.accountVerificationOTP === ""
    )
      return res
        .status(400)
        .json({ message: `OTP is invalid`, success: false });

    if (Date.now() > user.accountVerificationOTPExpireAt)
      return res
        .status(400)
        .json({ message: `OTP Expired. Please verify again`, success: false });

    user.isAccountVerified = true;
    user.accountVerificationOTP = "";
    user.accountVerificationOTPExpireAt = 0;

    await user.save();

    return res
      .status(200)
      .json({ message: `Account verified successfully`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
