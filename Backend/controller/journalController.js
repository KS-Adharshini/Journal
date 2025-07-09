// backend/controllers/journalController.js

const JournalEntry = require('../models/JournalEntry');

// Create entry
exports.createJournalEntry = async (req, res) => {
  try {
    const entry = new JournalEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create journal entry', error });
  }
};

// Get entry by date
exports.getJournalEntry = async (req, res) => {
  try {
    const date = req.params.date;
    const entry = await JournalEntry.findOne({ date });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch journal entry', error });
  }
};

// Update entry by date
exports.updateJournalEntry = async (req, res) => {
  try {
    const date = req.params.date;
    const updatedEntry = await JournalEntry.findOneAndUpdate({ date }, req.body, { new: true });
    if (!updatedEntry) return res.status(404).json({ message: 'Entry not found' });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update journal entry', error });
  }
};

// Delete entry by date
exports.deleteJournalEntry = async (req, res) => {
  try {
    const date = req.params.date;
    const deleted = await JournalEntry.findOneAndDelete({ date });
    if (!deleted) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete journal entry', error });
  }
};
