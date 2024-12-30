import cricketerModel from "../../Models/Cricketer.js";

export const fetchCricketers = async (req, res) => {
  const { userID } = req.body;

  try {
    const cricketers = await cricketerModel.find({ author: userID });
    if (!cricketers.length)
      return res.status(404).json({ message: `No Data Found`, success: false });

    return res.status(200).json({
      message: `Data Fetched Successfully`,
      success: true,
      cricketers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
