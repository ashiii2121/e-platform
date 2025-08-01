import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./EnhancedSignupPage.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";

function EnhancedSignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
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
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would be an actual API call
      // const { data } = await axios.post('/api/auth/signup', formData);
      // localStorage.setItem('userInfo', JSON.stringify(data));

      navigate("/dashboard");
    } catch (err) {
      setErrors({
        submit:
          err.response?.data?.message || "An error occurred during signup",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: "", color: "#e2e8f0" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthData = [
      { label: "Very Weak", color: "#f56565" },
      { label: "Weak", color: "#ed8936" },
      { label: "Fair", color: "#ecc94b" },
      { label: "Good", color: "#48bb78" },
      { label: "Strong", color: "#38a169" },
    ];

    return {
      strength,
      label: strengthData[strength - 1]?.label || "",
      color: strengthData[strength - 1]?.color || "#e2e8f0",
    };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">
              <FaGraduationCap size={60} />
            </div>
            <h1>Join Kerala HSE Platform</h1>
            <p>
              Access thousands of previous year question papers and excel in
              your HSE exams
            </p>
            <div className="features-list">
              <div className="feature-item">
                <FaCheck className="feature-icon" />
                <span>25+ Years of Question Papers</span>
              </div>
              <div className="feature-item">
                <FaCheck className="feature-icon" />
                <span>All Subjects Covered</span>
              </div>
              <div className="feature-item">
                <FaCheck className="feature-icon" />
                <span>Mobile Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Create Your Account</h2>
              <p>Start your journey to HSE success</p>
            </div>

            {errors.submit && (
              <div className="error-banner">
                <FaTimes className="error-icon" />
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="signup-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("name")}
                    className={`form-input ${errors.name ? "error" : ""} ${
                      touched.name && !errors.name && formData.name
                        ? "success"
                        : ""
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                  {touched.name && !errors.name && formData.name && (
                    <FaCheck className="validation-icon success" />
                  )}
                </div>
                {errors.name && (
                  <span className="error-text">{errors.name}</span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("email")}
                    className={`form-input ${errors.email ? "error" : ""} ${
                      touched.email && !errors.email && formData.email
                        ? "success"
                        : ""
                    }`}
                    placeholder="Enter your email address"
                    required
                  />
                  {touched.email &&
                    !errors.email &&
                    formData.email &&
                    validateEmail(formData.email) && (
                      <FaCheck className="validation-icon success" />
                    )}
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("password")}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create a strong password"
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
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                          backgroundColor: passwordStrength.color,
                        }}
                      ></div>
                    </div>
                    <span
                      className="strength-label"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    className={`form-input ${
                      errors.confirmPassword ? "error" : ""
                    } ${
                      touched.confirmPassword &&
                      !errors.confirmPassword &&
                      formData.confirmPassword
                        ? "success"
                        : ""
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {touched.confirmPassword &&
                    !errors.confirmPassword &&
                    formData.confirmPassword && (
                      <FaCheck className="validation-icon success" />
                    )}
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <div className="form-footer">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="login-link">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedSignupPage;
