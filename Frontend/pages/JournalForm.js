import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ratingQuotes = [
  "Every storm runs out of rain.",
  "Better days are coming.",
  "Progress is progress, no matter how small.",
  "You're getting there, keep going!",
  "You're halfway to amazing!",
  "You're doing good!",
  "Great effort today!",
  "You crushed it!",
  "Fantastic day!",
  "You're unstoppable!",
];

const JournalForm = () => {
  const [form, setForm] = useState({
    thoughts: "",
    rate: 5,
    bestMemory: "",
    worstMemory: "",
    date: "",
  });

  const [quote, setQuote] = useState(ratingQuotes[5]);
  const [entries, setEntries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (field === "rate") {
      const index = Math.min(9, Math.max(0, Number(value) - 1));
      setQuote(ratingQuotes[index]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Submission successful!");
        setForm({
          thoughts: "",
          rate: 5,
          bestMemory: "",
          worstMemory: "",
          date: "",
        });
        setQuote(ratingQuotes[5]);
      } else {
        const err = await response.json();
        alert("Error: " + err.error);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const handleView = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/journals/view");
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
        alert("Fetched journal entries!");
      } else {
        alert("Error fetching entries");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedId) return alert("Select an entry to update.");

    try {
      const response = await fetch(`http://localhost:5000/api/journals/update/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Updated successfully!");
        setSelectedId(null);
        handleView();
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return alert("Select an entry to delete.");

    try {
      const response = await fetch(`http://localhost:5000/api/journals/delete/${selectedId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Deleted successfully!");
        setSelectedId(null);
        handleView();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.backBtn} onClick={() => navigate("/")}>
        ← Back
      </button>
      <h2 style={styles.title}>Daily Journal</h2>

      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>How was your day?</label>
            <textarea
              style={styles.textarea}
              rows="4"
              placeholder="Type your thoughts..."
              value={form.thoughts}
              onChange={(e) => handleChange("thoughts", e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Best Memory</label>
            <input
              style={styles.input}
              type="text"
              value={form.bestMemory}
              onChange={(e) => handleChange("bestMemory", e.target.value)}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Date</label>
            <input
              style={styles.input}
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Rate your day (1 to 10)</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              max="10"
              value={form.rate}
              onChange={(e) => handleChange("rate", e.target.value)}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Worst Memory</label>
            <input
              style={styles.input}
              type="text"
              value={form.worstMemory}
              onChange={(e) => handleChange("worstMemory", e.target.value)}
            />
          </div>
        </div>

        <p style={styles.quote}>{quote}</p>

        <div style={styles.buttonRow}>
          <button type="button" style={styles.button} onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" style={styles.button} onClick={handleView}>
            View
          </button>
          <button type="button" style={styles.button} onClick={handleUpdate}>
            Update
          </button>
          <button type="button" style={styles.button} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>

      {/* Display entries */}
      {entries.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Existing Entries</h3>
          <ul>
            {entries.map((entry) => (
              <li key={entry._id} style={{ marginBottom: "10px", cursor: "pointer" }}>
                <span
                  onClick={() => {
                    setSelectedId(entry._id);
                    setForm({
                      thoughts: entry.thoughts,
                      rate: entry.rate,
                      bestMemory: entry.bestMemory,
                      worstMemory: entry.worstMemory,
                      date: entry.date,
                    });
                  }}
                >
                  {entry.date} — {entry.thoughts.slice(0, 30)}...
                </span>
              </li>
            ))}
          </ul>
          {selectedId && <p>📝 Selected Entry ID: {selectedId}</p>}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    color: "white",
    backgroundColor: "#121212",
    borderRadius: "15px",
    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
  },
  backBtn: {
    marginBottom: "10px",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  row: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  inputGroup: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    minWidth: "300px",
  },
  label: {
    marginBottom: "6px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e1e1e",
    color: "#eee",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e1e1e",
    color: "#eee",
    resize: "vertical",
  },
  quote: {
    fontStyle: "italic",
    color: "#aaa",
    textAlign: "center",
    marginTop: "10px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  button: {
    background: "linear-gradient(to right, #ff6ec4, #7873f5)",
    border: "none",
    borderRadius: "20px",
    padding: "10px 18px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
  },
};

export default JournalForm;
