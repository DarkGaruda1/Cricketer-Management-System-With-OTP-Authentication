import cricketerModel from "../../Models/Cricketer.js";

export const createCricketer = async (req, res) => {
  const { name, nationality, role, battingStyle, bowlingStyle, userID } =
    req.body;

  if (!name || !nationality || !role || !battingStyle || !bowlingStyle)
    return res
      .status(400)
      .json({ message: `All required fields must be present` });

  try {
    const newCricketer = new cricketerModel({
      name,
      nationality,
      role,
      battingStyle,
      bowlingStyle,
      author: userID,
    });

    await newCricketer.save();

    return res
      .status(201)
      .json({ message: `New Cricketer Successfully Created`, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
