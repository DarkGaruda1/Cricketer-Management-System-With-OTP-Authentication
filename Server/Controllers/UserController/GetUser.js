import userModel from "../../Models/User.js";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await userModel.findById(userID);

    if (user.isAccountVerified) {
      const verified_token = jwt.sign(
        { isAccountVerified: true },
        process.env.JWT_SECRET_VERIFIED,
        { expiresIn: "7d" }
      );
      res.cookie("verified_account", verified_token, { httpOnly: true });
    }
    return res
      .status(200)
      .json({ name: user.name, isVerified: user.isAccountVerified });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
