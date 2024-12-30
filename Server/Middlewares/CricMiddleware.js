import jwt from "jsonwebtoken";
export const cricMiddleware = (req, res, next) => {
  const { verified_account } = req.cookies;

  if (!verified_account)
    return res.status(401).json({
      message: `Cannot perform action as account is not verified`,
      success: false,
    });

  try {
    const decodedToken = jwt.verify(
      verified_account,
      process.env.JWT_SECRET_VERIFIED
    );

    if (!decodedToken.isAccountVerified)
      return res.status(401).json({
        message: `Cannot perform action as account is not verified`,
        success: false,
      });

    req.body.isAccountVerified = true;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Internal Server Error ${error.message}`,
      success: false,
    });
  }
};
