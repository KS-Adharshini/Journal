// backend/routes/journalRoutes.js

const express = require('express');
const router = express.Router();

const {
  createJournalEntry,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} = require('../controllers/journalController');

router.post('/', createJournalEntry);
router.get('/:date', getJournalEntry);
router.put('/:date', updateJournalEntry);
router.delete('/:date', deleteJournalEntry);

module.exports = router;
