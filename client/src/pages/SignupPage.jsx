import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for now (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful signup
      const userData = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        isTrialActive: true,
        trialEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      };

      localStorage.setItem('userInfo', JSON.stringify(userData));
      navigate('/dashboard');

      // Uncomment for real API call:
      // const { data } = await axios.post('/api/auth/signup', {
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email,
      //   password: formData.password
      // });
      // localStorage.setItem('userInfo', JSON.stringify(data));
      // navigate('/dashboard');

    } catch (err) {
      setErrors({
        submit: err.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f97316';
    if (passwordStrength < 75) return '#eab308';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="signup-page">
      <div className="signup-page__container">
        {/* Left Side - Branding */}
        <div className="signup-page__branding">
          <div className="branding__content">
            <div className="branding__logo">
              <div className="logo__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="url(#gradient)"/>
                  <path d="M12 18h24M12 24h24M12 30h18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#1d4ed8"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="logo__text">EduWeb</span>
            </div>

            <div className="branding__hero">
              <h1 className="branding__title">
                Start Your <span className="branding__highlight">Learning Journey</span> Today
              </h1>
              <p className="branding__description">
                Join thousands of students who have transformed their academic success with our comprehensive learning platform.
              </p>
            </div>

            <div className="branding__features">
              <div className="feature-item">
                <div className="feature-item__icon">📚</div>
                <div className="feature-item__content">
                  <h3>500+ Video Lessons</h3>
                  <p>Expert-created content for all subjects</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-item__icon">🎯</div>
                <div className="feature-item__content">
                  <h3>Practice Questions</h3>
                  <p>Thousands of questions to master concepts</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-item__icon">🏆</div>
                <div className="feature-item__content">
                  <h3>95% Success Rate</h3>
                  <p>Proven track record of student success</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-item__icon">⚡</div>
                <div className="feature-item__content">
                  <h3>Instant Access</h3>
                  <p>Start learning immediately after signup</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-item__icon">👨‍🏫</div>
                <div className="feature-item__content">
                  <h3>Expert Educators</h3>
                  <p>Learn from qualified and experienced teachers</p>
                </div>
              </div>
            </div>

            <div className="branding__stats">
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Happy Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9/5</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free to Start</span>
              </div>
            </div>

            <div className="branding__testimonial">
              <div className="testimonial__content">
                <p>"EduWeb helped me improve my grades by 40%. The platform is amazing!"</p>
                <div className="testimonial__author">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=100&q=80" alt="Student" />
                  <div>
                    <h4>Sarah Johnson</h4>
                    <span>Class 12 Student</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="signup-page__form-section">
          <div className="form-section__container">
            <div className="form-section__header">
              <h2 className="form-section__title">Create Your Free Account</h2>
              <p className="form-section__subtitle">
                Create your free account to access courses, track your progress, and connect with expert educators.
              </p>
              <div className="form-section__cta">
                <p className="cta-text">
                  <strong>Sign up now to start learning!</strong>
                </p>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <span className="benefit-check">✅</span>
                    <span>Access free and premium courses</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-check">✅</span>
                    <span>Personalized dashboard</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-check">✅</span>
                    <span>Learn at your own pace</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-check">✅</span>
                    <span>24/7 student support</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-check">✅</span>
                    <span>Mobile-friendly platform</span>
                  </div>
                </div>
              </div>

              <div className="form-section__trust">
                <div className="trust-badge">
                  <span className="trust-icon">🔒</span>
                  <span>Your data is secure and protected</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-icon">⚡</span>
                  <span>Setup takes less than 2 minutes</span>
                </div>
              </div>
            </div>

            {errors.submit && (
              <div className="error-banner">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill="currentColor"/>
                </svg>
                <span>{errors.submit}</span>
              </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.firstName ? 'form-input--error' : ''}`}
                      placeholder="Enter your first name"
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  {errors.firstName && (
                    <span className="form-error">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.lastName ? 'form-input--error' : ''}`}
                      placeholder="Enter your last name"
                    />
                    <div className="input-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  {errors.lastName && (
                    <span className="form-error">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    placeholder="Enter your email address"
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? 'form-input--error' : ''}`}
                    placeholder="Create a strong password"
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" fill="currentColor"/>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" fill="currentColor"/>
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
                        <path d="M10 3C5.478 3 1.688 5.943.458 10c1.23 4.057 5.02 7 9.542 7s8.312-2.943 9.542-7C18.312 5.943 14.522 3 10 3zm0 12a5 5 0 110-10 5 5 0 010 10z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="password-strength__bar">
                      <div
                        className="password-strength__fill"
                        style={{
                          width: `${passwordStrength}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <span
                      className="password-strength__text"
                      style={{ color: getPasswordStrengthColor() }}
                    >
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <span className="form-error">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`form-input ${errors.confirmPassword ? 'form-input--error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <div className="input-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" fill="currentColor"/>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" fill="currentColor"/>
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fill="currentColor"/>
                        <path d="M10 3C5.478 3 1.688 5.943.458 10c1.23 4.057 5.02 7 9.542 7s8.312-2.943 9.542-7C18.312 5.943 14.522 3 10 3zm0 12a5 5 0 110-10 5 5 0 010 10z" fill="currentColor"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="form-error">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="form-group">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to the <Link to="/terms" className="link" target="_blank">Terms of Service</Link> and <Link to="/privacy" className="link" target="_blank">Privacy Policy</Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <span className="form-error">{errors.agreeToTerms}</span>
                )}
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? 'submit-btn--loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Start Learning for Free</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="form-section__footer">
              <p className="login-link">
                Already have an account? <Link to="/login" className="link">Sign in here</Link>
              </p>

              <div className="social-signup">
                <div className="social-signup__divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-btn social-btn--google">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M19.99 10.187c0-.82-.069-1.417-.216-2.037H10.2v3.698h5.62c-.113.955-.725 2.394-2.084 3.365l-.01.066 3.033 2.318.21.02c1.926-1.75 3.04-4.325 3.04-7.43z" fill="#4285F4"/>
                      <path d="M10.2 19.931c2.753 0 5.064-.886 6.753-2.414l-3.243-2.404c-.922.614-2.115.985-3.51.985-2.677 0-4.942-1.776-5.756-4.15l-.064.005-3.16 2.414-.041.059c1.677 3.287 5.122 5.505 9.021 5.505z" fill="#34A853"/>
                      <path d="M4.444 11.948c-.213-.614-.333-1.269-.333-1.948 0-.679.12-1.334.322-1.948l-.006-.068-3.197-2.448-.053.025A9.792 9.792 0 000 10c0 1.611.39 3.13 1.177 4.489l3.267-2.541z" fill="#FBBC05"/>
                      <path d="M10.2 3.853c1.914 0 3.206.815 3.943 1.501l2.898-2.784C15.253.985 12.953 0 10.199 0 6.301 0 2.856 2.218 1.18 5.561l3.244 2.541C5.238 5.628 7.503 3.853 10.2 3.853z" fill="#EB4335"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button className="social-btn social-btn--facebook">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" fill="#1877F2"/>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;