import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge hero__badge--free">
              <span className="hero__badge-text">� 100% Free for Students</span>
              <span className="hero__badge-sub">No credit card required</span>
            </div>
            <h1 className="hero__title">
              Unlock Your{" "}
              <span className="hero__title-highlight">Potential</span> with
              <br />
              Online Learning
            </h1>
            <div className="hero__free-message">
              <span className="hero__free-icon">🆓</span>
              <span>
                Start learning instantly, <b>no payment needed</b>!
              </span>
            </div>
            <p className="hero__description">
              Master your studies with comprehensive video tutorials, practice
              questions, and expert guidance for 10th, +1, and +2 standards.{" "}
              <b>Free forever for students.</b> Join thousands of successful
              learners today.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">10K+</span>
                <span className="hero__stat-label">Students</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">500+</span>
                <span className="hero__stat-label">Video Lessons</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">95%</span>
                <span className="hero__stat-label">Success Rate</span>
              </div>
            </div>
            <div className="hero__actions">
              <Link to="/signup" className="hero__cta-primary">
                <span>Start Free Trial</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link to="/dashboard" className="hero__cta-secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M10 6.667v3.333l2.5 2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Watch Demo</span>
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-container">
              <div className="hero__floating-card hero__floating-card--1">
                <div className="hero__card-icon">📚</div>
                <div className="hero__card-content">
                  <h4>Mathematics</h4>
                  <p>Advanced Algebra</p>
                </div>
              </div>
              <div className="hero__floating-card hero__floating-card--2">
                <div className="hero__card-icon">🧪</div>
                <div className="hero__card-content">
                  <h4>Chemistry</h4>
                  <p>Organic Compounds</p>
                </div>
              </div>
              <div className="hero__floating-card hero__floating-card--3">
                <div className="hero__card-icon">⚡</div>
                <div className="hero__card-content">
                  <h4>Physics</h4>
                  <p>Electromagnetism</p>
                </div>
              </div>
              <div className="hero__main-image">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Students learning together"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="hero__background">
          <div className="hero__gradient"></div>
          <div className="hero__pattern"></div>
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <div className="features__header">
            <h2 className="features__title">Why Choose EduWeb?</h2>
            <p className="features__description">
              Discover the features that make learning effective and enjoyable
            </p>
          </div>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="var(--primary-100)"
                  />
                  <path
                    d="M16 20h16M16 24h16M16 28h12"
                    stroke="var(--primary-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="12"
                    y="16"
                    width="24"
                    height="20"
                    rx="2"
                    stroke="var(--primary-600)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">Video Tutorials</h3>
              <p className="feature-card__description">
                Learn at your own pace with high-quality video lessons created
                by expert educators.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">500+ Videos</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="var(--secondary-100)"
                  />
                  <path
                    d="M24 12v24M12 24h24"
                    stroke="var(--secondary-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="10"
                    stroke="var(--secondary-600)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">Previous Year Questions</h3>
              <p className="feature-card__description">
                Practice with real exam questions from past years to boost your
                confidence and performance.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">1000+ Questions</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="var(--success-100)"
                  />
                  <path
                    d="M16 24l6 6 12-12"
                    stroke="var(--success-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="12"
                    stroke="var(--success-600)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">Model Questions</h3>
              <p className="feature-card__description">
                Test your knowledge with expertly crafted model papers designed
                to simulate real exams.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">200+ Papers</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="var(--warning-100)"
                  />
                  <path
                    d="M24 16v8l4 4"
                    stroke="var(--warning-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="12"
                    stroke="var(--warning-600)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">24/7 Support</h3>
              <p className="feature-card__description">
                Get help whenever you need it with our round-the-clock student
                support system.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Always Available</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--info-100)" />
                  <path
                    d="M24 32V16M16 24h16"
                    stroke="var(--info-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="14"
                    y="14"
                    width="20"
                    height="20"
                    rx="2"
                    stroke="var(--info-600)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">Progress Tracking</h3>
              <p className="feature-card__description">
                Monitor your learning progress with detailed analytics and
                performance insights.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Real-time Analytics</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect
                    width="48"
                    height="48"
                    rx="12"
                    fill="var(--primary-100)"
                  />
                  <path
                    d="M20 28l4-4 4 4M24 24V12"
                    stroke="var(--primary-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36 20v16a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V20"
                    stroke="var(--primary-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="feature-card__title">Downloadable Content</h3>
              <p className="feature-card__description">
                Access study materials offline with downloadable PDFs and
                practice sheets.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Offline Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials__container">
          <div className="testimonials__header">
            <h2 className="testimonials__title">What Our Students Say</h2>
            <p className="testimonials__description">
              Real success stories from students who achieved their goals
            </p>
          </div>
          <div className="testimonials__grid">
            <div className="testimonial-card">
              <div className="testimonial-card__rating">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="testimonial-card__text">
                "EduWeb transformed my understanding of complex topics. The
                video tutorials are incredibly clear and the practice questions
                helped me ace my exams!"
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80"
                    alt="Sarah"
                  />
                </div>
                <div className="testimonial-card__info">
                  <h4 className="testimonial-card__name">Sarah Johnson</h4>
                  <p className="testimonial-card__role">Class 12 Student</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-card__rating">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="testimonial-card__text">
                "The previous year questions section is a game-changer. I
                practiced extensively and scored 95% in my board exams. Highly
                recommended!"
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80"
                    alt="Michael"
                  />
                </div>
                <div className="testimonial-card__info">
                  <h4 className="testimonial-card__name">Michael Chen</h4>
                  <p className="testimonial-card__role">Class 10 Graduate</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-card__rating">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="testimonial-card__text">
                "Amazing platform with excellent content quality. The 24/7
                support helped me whenever I was stuck. Thank you EduWeb!"
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80"
                    alt="Priya"
                  />
                </div>
                <div className="testimonial-card__info">
                  <h4 className="testimonial-card__name">Priya Sharma</h4>
                  <p className="testimonial-card__role">Class 11 Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section__container">
          <div className="cta-section__content">
            <h2 className="cta-section__title">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="cta-section__description">
              Join thousands of successful students and unlock your potential
              today
            </p>
            <div className="cta-section__actions">
              <Link to="/signup" className="cta-section__btn-primary">
                Start Free Trial
              </Link>
              <Link to="/pricing" className="cta-section__btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
          <div className="cta-section__features">
            <div className="cta-feature">
              <span className="cta-feature__icon">✅</span>
              <span className="cta-feature__text">7-day free trial</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature__icon">✅</span>
              <span className="cta-feature__text">No credit card required</span>
            </div>
            <div className="cta-feature">
              <span className="cta-feature__icon">✅</span>
              <span className="cta-feature__text">Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
