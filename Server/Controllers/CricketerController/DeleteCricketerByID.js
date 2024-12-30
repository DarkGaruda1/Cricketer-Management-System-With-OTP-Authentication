import cricketerModel from "../../Models/Cricketer.js";

export const deleteCricketerById = async (req, res) => {
  const { userID } = req.body;
  const { id } = req.params;

  try {
    const cricketer = await cricketerModel.findOneAndDelete({
      author: userID,
      _id: id,
    });
    if (!cricketer)
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
