// src/pages/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";
import API from "../utils/api";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await API.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        dob: form.dob,
      });
      alert("Sign up successful!");
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.error || "Error signing up");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <input
          type="date"
          required
          value={form.dob}
          onChange={(e) => setForm({ ...form, dob: e.target.value })}
        />
        <div class="button-group">
        <button type="submit">Sign In</button>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => navigate("/")}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
