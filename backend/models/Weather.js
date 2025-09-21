import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  rainfall: String,
  cropRecommendation: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Weather", weatherSchema);
