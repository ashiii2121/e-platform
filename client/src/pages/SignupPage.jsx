import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthPage.css";
import { FaUser, FaLock } from "react-icons/fa";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="auth-container gradient-bg">
      <div className="hero-signup">
        <div className="hero-text">
          <h1>
            Join the Platform, <span className="highlight">It's Free!</span>
          </h1>
          <p>
            Unlock exclusive content, connect with a vibrant community, and
            start your journey today. No credit card required!
          </p>
        </div>
        <div className="hero-illustration">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="60" cy="60" r="60" fill="#e0f7fa" />
            <ellipse cx="60" cy="80" rx="35" ry="18" fill="#b2ebf2" />
            <circle
              cx="60"
              cy="54"
              r="24"
              fill="#fff"
              stroke="#00796b"
              strokeWidth="2"
            />
            <ellipse cx="60" cy="54" rx="14" ry="10" fill="#b2dfdb" />
            <ellipse cx="60" cy="54" rx="7" ry="5" fill="#fff" />
          </svg>
        </div>
      </div>
      <form className="auth-form glass-effect" onSubmit={handleSubmit}>
        <div className="icon-circle">
          <FaUser size={40} color="#00796b" />
        </div>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-icon-group">
            <FaUser className="input-icon" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-icon-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-icon-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter your password"
            />
          </div>
        </div>
        <button type="submit" className="btn primary">
          Sign Up
        </button>
        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
