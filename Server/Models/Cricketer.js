import mongoose from "mongoose";
import userModel from "./User.js";

const cricketerSchema = mongoose.Schema({
  name: { type: String, required: true },
  nationality: { type: String, required: true },
  role: { type: String, required: true },
  battingStyle: { type: String, required: true },
  bowlingStyle: { type: String, required: true },

  testBatInnings: { type: Number },
  testBatRuns: { type: Number },
  testBatAverage: { type: Number },
  testBatStrikeRate: { type: Number },
  testBowlBalls: { type: Number },
  testBowlMaidens: { type: Number },
  testBowlRuns: { type: Number },
  testBowlWickets: { type: Number },
  testBowlEcon: { type: Number },
  testBowlBestFig: { type: Number },
  testBowlFifers: { type: Number },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
});

const cricketerModel = new mongoose.model("Cricketer", cricketerSchema);

export default cricketerModel;
