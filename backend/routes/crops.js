import express from "express";
import Crop from "../models/Crop.js";
import auth from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", auth, authorize("admin"), async (req, res) => {
  try {
    const { name, optimalTemperature, optimalHumidity, bestSowingMonths, bestHarvestMonths } = req.body;
    const crop = new Crop({ name, optimalTemperature, optimalHumidity, bestSowingMonths, bestHarvestMonths });
    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
