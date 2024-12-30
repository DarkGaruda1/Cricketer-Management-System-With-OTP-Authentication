import cricketerModel from "../../Models/Cricketer.js";

export const updateCricketerById = async (req, res) => {
  const { userID, updateData } = req.body;
  const { id } = req.params;

  if (!updateData) {
    return res
      .status(400)
      .json({ message: `Nothing To Update`, success: false });
  }
  try {
    const cricketer = await cricketerModel.findOneAndUpdate(
      {
        author: userID,
        _id: id,
      },
      { $set: { ...updateData } },
      { new: true }
    );
    if (!cricketer)
      return res
        .status(404)
        .json({ message: `No Data Found For Update`, success: false });

    return res.status(200).json({
      message: `Data Updated Successfully`,
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
