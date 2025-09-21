import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Weather from "./models/Weather.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Default ruta
app.get("/", (req, res) => {
  res.send("🌱 Agriculture API Running");
});

app.get("/api/weather", (req, res) => {
  res.json({
    temperature: 22,
    humidity: 65,
    rainfall: "low",
    cropRecommendation: "Good time for planting potatoes 🌿",
  });
});

app.post("/api/weather", async (req, res) => {
  try {
    const newWeather = new Weather(req.body);
    await newWeather.save();
    res.status(201).json(newWeather);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/weather", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

