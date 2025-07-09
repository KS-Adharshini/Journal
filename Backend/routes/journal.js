const express = require("express");
const router = express.Router();
const JournalEntry = require("../models/JournalEntry");

// Create entry
router.post("/", async (req, res) => {
  const { thoughts, rate, bestMemory, worstMemory, date } = req.body;
  if (!thoughts || !rate || !bestMemory || !worstMemory || !date) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newEntry = new JournalEntry({ thoughts, rate, bestMemory, worstMemory, date });
    await newEntry.save();
    res.status(201).json({ message: "Entry saved successfully." });
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

// View all entries
router.get("/view", async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch entries." });
  }
});

// Update entry
router.put("/update/:id", async (req, res) => {
  try {
    const updated = await JournalEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Entry not found." });
    res.json({ message: "Updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Update failed." });
  }
});

// Delete entry
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await JournalEntry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Entry not found." });
    res.json({ message: "Deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Delete failed." });
  }
});

module.exports = router;
