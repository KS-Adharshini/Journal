// src/components/SubmitEntry.js
import React, { useState } from "react";
import axios from "axios";

const SubmitEntry = () => {
  const [formData, setFormData] = useState({
    thoughts: "",
    rate: "",
    bestMemory: "",
    worstMemory: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/journals", formData);
      alert("Entry submitted!");
      setFormData({ thoughts: "", rate: "", bestMemory: "", worstMemory: "", date: "" });
    } catch (err) {
      alert("Submission failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="thoughts" placeholder="Thoughts" value={formData.thoughts} onChange={handleChange} />
      <input name="rate" type="number" placeholder="Rate" value={formData.rate} onChange={handleChange} />
      <input name="bestMemory" placeholder="Best Memory" value={formData.bestMemory} onChange={handleChange} />
      <input name="worstMemory" placeholder="Worst Memory" value={formData.worstMemory} onChange={handleChange} />
      <input name="date" type="date" value={formData.date} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitEntry;
