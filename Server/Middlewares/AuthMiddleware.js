import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: `User Not Logged In`, success: false });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ message: `Invalid Token`, success: false });
    }

    req.body.userID = decodedToken.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error ${error.message}`,
      success: false,
    });
  }
};
