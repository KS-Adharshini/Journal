import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const MoodSelect = () => {
  const [mood, setMood] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (mood) {
      localStorage.setItem("userMood", mood);
      navigate("/quote");
    } else {
      alert("Please select your mood");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="title">How Are You Feeling Today?</h1>
      <p className="subtitle">Your mood shapes your journey. Choose how you're feeling to get started.</p>

      <select value={mood} onChange={(e) => setMood(e.target.value)} className="dropdown mood-select">
        <option value="">-- Select Mood --</option>
        <option value="Great">😄 Great</option>
        <option value="Moderate">😐 Moderate</option>
        <option value="Bad">😞 Bad</option>
      </select>

      <button onClick={handleSubmit} className="gradient-button">
        Continue
      </button>
    </div>
  );
};

export default MoodSelect;
