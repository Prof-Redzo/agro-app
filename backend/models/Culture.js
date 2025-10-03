import mongoose from "mongoose";

const cultureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  season: String, 
});

export default mongoose.model("Culture", cultureSchema);
