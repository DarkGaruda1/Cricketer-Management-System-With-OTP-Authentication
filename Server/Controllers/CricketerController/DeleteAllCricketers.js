import cricketerModel from "../../Models/Cricketer";

export const deleteAllCricketers = async (req, res) => {
  const { userID } = req.body;

  try {
    const cricketers = await cricketerModel.deleteMany({ author: userID });
    if (!cricketers.length)
      return res
        .status(404)
        .json({ message: `No Data Found For Deletion`, success: false });

    return res.status(200).json({
      message: `Data Deleted Successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Internal Server Error ${error.message}`,
    });
  }
};
