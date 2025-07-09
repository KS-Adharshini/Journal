import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const moodQuotes = {
  Great: "Keep shining! You're doing amazing!",
  Moderate: "Every day won't be perfect, but keep going.",
  Bad: "Tough times don’t last, but tough people do."
};

const Quote = () => {
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const mood = localStorage.getItem("userMood");
    if (mood && moodQuotes[mood]) {
      setQuote(moodQuotes[mood]);
    } else {
      setQuote("Welcome to your journaling space!");
    }
  }, []);

  return (
    <div className="auth-container fade-in">
      <h1 className="title">A Thought for You</h1>
      <p className="quote-text">{`"${quote}"`}</p>

      <div className="button-group">
        <button className="gradient-button" onClick={() => navigate("/journal")}>
          Start Journaling
        </button>
        <button className="secondary-button" onClick={() => navigate("/mood")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Quote;
