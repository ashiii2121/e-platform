import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { authAPI, handleApiError } from "../services/api";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import "./PricingPage.css";
import {
  FaCheck,
  FaTimes,
  FaCrown,
  FaGraduationCap,
  FaDownload,
  FaBookOpen,
  FaUsers,
  FaHeadset,
  FaStar,
  FaRocket,
  FaLock,
  FaInfinity,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

function PricingPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [isLoading, setIsLoading] = useState(false);

  const heroRef = useRef(null);
  const plansRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();

    // Hero section animation
    tl.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Plans animation with scroll trigger
    if (plansRef.current) {
      gsap.fromTo(
        plansRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: plansRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Testimonials animation
    if (testimonialsRef.current) {
      gsap.fromTo(
        testimonialsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Floating animation for plan cards
    gsap.to(".pricing-card", {
      y: -5,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1,
        from: "random",
      },
    });
  }, []);

  const pricingPlans = [
    {
      id: "free",
      name: "Free",
      price: 0,
      period: "Forever",
      description: "Perfect for getting started",
      icon: <FaGraduationCap />,
      features: [
        "Access to 5 recent papers",
        "Basic download functionality",
        "Community support",
        "Mobile responsive design",
      ],
      limitations: [
        "Limited paper access",
        "No premium features",
        "Standard support only",
      ],
      buttonText: "Get Started",
      popular: false,
      color: "#667eea",
    },
    {
      id: "monthly",
      name: "Monthly Pro",
      price: 9.99,
      period: "per month",
      description: "Great for short-term preparation",
      icon: <FaRocket />,
      features: [
        "Access to all 25+ years of papers",
        "Unlimited downloads",
        "Priority support",
        "Advanced search filters",
        "Mobile app access",
        "Offline download capability",
      ],
      limitations: [],
      buttonText: "Start Monthly",
      popular: false,
      color: "#e0284a",
    },
    {
      id: "yearly",
      name: "Yearly Pro",
      price: 99.99,
      period: "per year",
      originalPrice: 119.88,
      description: "Best value for serious students",
      icon: <FaCrown />,
      features: [
        "Everything in Monthly Pro",
        "2 months free (save 17%)",
        "Exclusive study materials",
        "Priority customer support",
        "Early access to new features",
        "Detailed analytics",
        "Custom study plans",
      ],
      limitations: [],
      buttonText: "Choose Yearly",
      popular: true,
      color: "#764ba2",
    },
    {
      id: "lifetime",
      name: "Lifetime Access",
      price: 299.99,
      period: "one-time",
      description: "Ultimate value for dedicated learners",
      icon: <FaInfinity />,
      features: [
        "Everything in Yearly Pro",
        "Lifetime access guarantee",
        "Future updates included",
        "Premium study resources",
        "1-on-1 mentorship session",
        "Certificate of completion",
        "Alumni network access",
      ],
      limitations: [],
      buttonText: "Get Lifetime",
      popular: false,
      color: "#e0284a",
    },
  ];

  const handlePayment = async (plan) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      navigate("/login");
      return;
    }

    try {
      // Simulate payment success
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/payment",
        {
          userId: userInfo._id,
          amount:
            plan === "Monthly" ? 9.99 : plan === "Yearly" ? 99.99 : 299.99,
        },
        config
      );

      if (data.success) {
        // Update user info in local storage (simulating payment success)
        const updatedUserInfo = {
          ...userInfo,
          isPaid: true,
          isTrialActive: false,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        alert(`Payment for ${plan} successful!`);
        navigate("/dashboard");
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <div className="pricing-hero" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaCrown className="badge-icon" />
              <span>Premium Education Platform</span>
            </div>

            <h1 className="hero-title">
              Choose Your <span className="hero-highlight">Perfect Plan</span>
            </h1>

            <p className="hero-description">
              Unlock your potential with Kerala HSE Platform. Get access to 25+ years of question papers,
              expert guidance, and comprehensive study materials to boost your exam preparation.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <FaUsers />
                </div>
                <div className="stat-content">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Happy Students</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FaBookOpen />
                </div>
                <div className="stat-content">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years of Papers</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-content">
                  <span className="stat-number">4.9/5</span>
                  <span className="stat-label">Average Rating</span>
                </div>
              </div>
            </div>

            <div className="hero-cta">
              <p className="cta-text">Join thousands of successful students today!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-header">
            <h2 className="pricing-title">Choose Your Learning Journey</h2>
            <p className="pricing-subtitle">
              Select the perfect plan that fits your study goals and budget.
              All plans include our core features with varying levels of access.
            </p>
          </div>

          {error && <div className="error-message global-error">{error}</div>}

          <div className="pricing-plans" ref={plansRef}>
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <FaCrown className="popular-icon" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-icon" style={{ color: "#FF8282" }}>
                    {plan.icon}
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-pricing">
                  {plan.originalPrice && (
                    <div className="original-price">
                      <span className="currency">₹</span>
                      <span className="price">{plan.originalPrice}</span>
                    </div>
                  )}
                  <div className="price-display">
                    <span className="currency">₹</span>
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="savings-badge">
                      <span>Save ₹{(plan.originalPrice - plan.price).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="plan-features">
                  <h4 className="features-title">What's included:</h4>
                  <ul className="features-list">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="feature-item">
                        <FaCheck className="feature-icon feature-icon--check" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="feature-item feature-item--limitation">
                        <FaTimes className="feature-icon feature-icon--times" />
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-action">
                  <button
                    className={`plan-button ${plan.popular ? "plan-button--primary" : "plan-button--outline"}`}
                    onClick={() => handlePayment(plan)}
                    disabled={isLoading}
                  >
                    <span>{plan.buttonText}</span>
                    <FaRocket className="button-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2>Why Choose Kerala HSE Platform?</h2>
          <div className="features-grid" ref={featuresRef}>
            <div className="feature-item">
              <FaLock className="feature-icon" />
              <h4>Trusted Content</h4>
              <p>Authentic question papers verified by education experts</p>
            </div>
            <div className="feature-item">
              <FaDownload className="feature-icon" />
              <h4>Instant Access</h4>
              <p>Download papers immediately after subscription</p>
            </div>
            <div className="feature-item">
              <FaHeadset className="feature-icon" />
              <h4>24/7 Support</h4>
              <p>Get help whenever you need it from our support team</p>
            </div>
            <div className="feature-item">
              <FaRocket className="feature-icon" />
              <h4>Regular Updates</h4>
              <p>New papers and features added regularly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="container">
          <h2>What Students Say</h2>
          <div className="testimonials-grid" ref={testimonialsRef}>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p>
                "Kerala HSE Platform helped me score 95% in my HSE exams. The
                question papers are exactly what I needed!"
              </p>
              <div className="student-info">
                <strong>Arjun K.</strong>
                <span>Science Stream, 2024</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p>
                "The best investment I made for my studies. 25 years of papers
                in one place - amazing!"
              </p>
              <div className="student-info">
                <strong>Priya S.</strong>
                <span>Commerce Stream, 2024</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p>
                "User-friendly interface and instant downloads. Highly
                recommended for all HSE students!"
              </p>
              <div className="student-info">
                <strong>Rahul M.</strong>
                <span>Arts Stream, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
