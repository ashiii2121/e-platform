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
        <div className="hero-content">
          <h1>Choose Your Perfect Plan</h1>
          <p>
            Unlock your potential with Kerala HSE Platform. Get access to 25+
            years of question papers and boost your exam preparation.
          </p>

          <div className="hero-stats">
            <div className="stat-item">
              <FaUsers />
              <span>10,000+ Students</span>
            </div>
            <div className="stat-item">
              <FaBookOpen />
              <span>25+ Years Papers</span>
            </div>
            <div className="stat-item">
              <FaStar />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="pricing-section">
        <div className="container">
          {error && <div className="error-message global-error">{error}</div>}

          <div className="pricing-plans" ref={plansRef}>
            {pricingPlans.map((plan, index) => (
              <AnimatedCard
                key={plan.id}
                className={`pricing-card ${plan.popular ? "popular" : ""}`}
                hoverEffect="lift"
                glowColor={plan.color}
                delay={index * 0.1}
              >
                {plan.popular && (
                  <div className="popular-badge">
                    <FaCrown />
                    Most Popular
                  </div>
                )}

                <div className="plan-header">
                  <div className="plan-icon" style={{ color: plan.color }}>
                    {plan.icon}
                  </div>
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-pricing">
                  {plan.originalPrice && (
                    <span className="original-price">
                      ₹{plan.originalPrice}
                    </span>
                  )}
                  <div className="price-display">
                    <span className="currency">₹</span>
                    <span className="price">{plan.price}</span>
                    <span className="period">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="savings">
                      Save ₹{(plan.originalPrice - plan.price).toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, idx) => (
                      <li key={idx}>
                        <FaCheck className="check-icon" />
                        {feature}
                      </li>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <li key={idx} className="limitation">
                        <FaTimes className="times-icon" />
                        {limitation}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-action">
                  <AnimatedButton
                    variant={plan.popular ? "primary" : "outline"}
                    size="large"
                    animation="ripple"
                    loading={isLoading}
                    onClick={() => handlePayment(plan)}
                    className="plan-button"
                    style={{
                      background: plan.popular
                        ? `linear-gradient(135deg, ${plan.color}, #764ba2)`
                        : undefined,
                      borderColor: plan.color,
                      color: plan.popular ? "white" : plan.color,
                    }}
                  >
                    {plan.buttonText}
                  </AnimatedButton>
                </div>
              </AnimatedCard>
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
