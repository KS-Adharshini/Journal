// File: frontend/src/components/JournalEntryDetails.js

import React, { useState } from 'react';
import axios from 'axios';

const JournalEntryDetails = ({ mode }) => {
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState(null);
  const [message, setMessage] = useState('');

  const handleFetch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/journal/date/${date}`);
      setEntry(res.data);
      setMessage('');
    } catch (err) {
      console.error(err);
      setEntry(null);
      setMessage('Entry not found.');
    }
  };

  const handleUpdateOrDelete = async () => {
    try {
      if (!entry?._id) {
        setMessage('No entry loaded.');
        return;
      }

      if (mode === 'Update') {
        await axios.put(`http://localhost:5000/api/journal/${entry._id}`, entry);
        setMessage('Updated successfully!');
      } else if (mode === 'Delete') {
        await axios.delete(`http://localhost:5000/api/journal/${entry._id}`);
        setEntry(null);
        setMessage('Deleted successfully!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Action failed.');
    }
  };

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ color: 'white', backgroundColor: '#111', minHeight: '100vh', padding: '2rem' }}>
      <button onClick={() => window.history.back()} style={{ marginBottom: '1rem' }}>← Back</button>
      <h2>{mode} Journal Entry</h2>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleFetch} style={btnStyle}>Fetch Entry</button>

      {entry && (
        <div style={entryStyle}>
          <input name="thoughts" value={entry.thoughts} onChange={handleChange} />
          <input name="bestMemory" value={entry.bestMemory} onChange={handleChange} />
          <input name="worstMemory" value={entry.worstMemory} onChange={handleChange} />
          <input name="rate" type="number" min="1" max="10" value={entry.rate} onChange={handleChange} />
          <br />
          {mode !== 'View' && (
            <button onClick={handleUpdateOrDelete} style={btnStyle}>
              {mode}
            </button>
          )}
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

const btnStyle = {
  margin: '0.5rem',
  padding: '0.5rem 1rem',
  background: 'linear-gradient(to right, #ff7eb3, #ff758c)',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  cursor: 'pointer'
};

const entryStyle = {
  backgroundColor: '#1c1c1e',
  padding: '1rem',
  marginTop: '1rem',
  borderRadius: '10px'
};

export default JournalEntryDetails;
