import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import { authAPI, handleApiError } from "../services/api";
import "./LoginPage.css";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaBookOpen,
  FaDownload,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animations
    const tl = gsap.timeline();

    tl.fromTo(
      heroRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      formRef.current,
      { opacity: 0, x: 100 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
      "-=0.7"
    );

    // Floating animation for hero icon
    gsap.to(".hero-icon", {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      alert("Login successful! Welcome back to Kerala HSE Platform.");

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        submit: handleApiError(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Hero Section */}
        <div className="hero-section" ref={heroRef}>
          <div className="hero-content">
            <div className="hero-icon">
              <FaGraduationCap />
            </div>
            <h1>Welcome Back to Kerala HSE Platform</h1>
            <p>
              Access your account to continue exploring 25+ years of Kerala HSE
              question papers and boost your exam preparation.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <FaBookOpen />
                </div>
                <div className="feature-text">
                  <h4>25+ Years of Papers</h4>
                  <p>Complete collection from 2000-2025</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaDownload />
                </div>
                <div className="feature-text">
                  <h4>Instant Downloads</h4>
                  <p>Download papers instantly in PDF format</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <div className="feature-text">
                  <h4>Join Thousands</h4>
                  <p>Trusted by Kerala HSE students</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section" ref={formRef}>
          <div className="form-container">
            <div className="form-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {errors.submit && (
                <div className="error-message global-error">
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <div className="input-container">
                  <FaUser className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    className={`form-input ${errors.email ? "error" : ""} ${
                      touched.email && !errors.email ? "valid" : ""
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <div className="input-container">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    className={`form-input ${errors.password ? "error" : ""} ${
                      touched.password && !errors.password ? "valid" : ""
                    }`}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
