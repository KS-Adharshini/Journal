import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add API call later here
    console.log({ email, password });
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="forgot">Forgot Password?</p>

        {/* ✅ Fix: Use className instead of class */}
        <div className="button-group">
          <button type="submit">Sign In</button>
          <button type="button" onClick={() => navigate("/")}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
