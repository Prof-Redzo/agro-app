import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import Weather from "./models/Weather.js";
import Crop from "./models/Crop.js";

import authRoutes from "./routes/auth.js";
import { auth } from "./middleware/auth.js";
import userRoutes from "./routes/user.js";
import cropsRouter from "./routes/crops.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ✅ rute
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/crops", cropsRouter);

app.get("/api/user/me", auth, (req, res) => {
  res.json({ message: "Welcome!", user: req.user });
});

app.get("/", (req, res) => {
  res.send("🌱 Agriculture API Running");
});

app.get("/api/weather", async (req, res) => {
  try {
    const data = await Weather.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

app.post("/api/crops", async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.status(201).json(crop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/crops", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/recommendation", async (req, res) => {
  try {
    const latestWeather = await Weather.findOne().sort({ date: -1 });
    if (!latestWeather) {
      return res.status(404).json({ message: "No weather data found" });
    }

    const crops = await Crop.find();
    const recommendations = [];

    crops.forEach((crop) => {
      const tempMatch =
        Math.abs(crop.optimalTemperature - latestWeather.temperature) <= 3;
      const humidityMatch =
        Math.abs(crop.optimalHumidity - latestWeather.humidity) <= 10;

      if (tempMatch && humidityMatch) {
        recommendations.push({
          crop: crop.name,
          message: `Good conditions for sowing or harvesting ${crop.name}`,
        });
      }
    });

    res.json({
      weather: latestWeather,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
