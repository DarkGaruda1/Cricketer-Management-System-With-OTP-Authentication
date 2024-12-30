import mongoose from "mongoose";
export const connect = async () => {
  try {
    console.log("Attempting Connection To DB");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("####################-DB Connected-####################");
  } catch (error) {
    console.log(`Failed To Connect To DB ${error}`);
  }
};
