import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  optimalTemperature: { type: Number, required: true }, 
  optimalHumidity: { type: Number, required: true }, 
  bestSowingMonths: [{ type: String, required: true }], 
  bestHarvestMonths: [{ type: String, required: true }], 
});

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
