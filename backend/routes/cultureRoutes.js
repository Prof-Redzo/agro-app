import express from "express";
import Culture from "../models/Culture.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cultures = await Culture.find();
    res.json(cultures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cultures" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCulture = new Culture(req.body);
    await newCulture.save();
    res.status(201).json(newCulture);
  } catch (err) {
    res.status(400).json({ error: "Failed to add culture" });
  }
});

export default router;
