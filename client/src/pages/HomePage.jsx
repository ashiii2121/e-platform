import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Class 12 Student",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80",
      text: "EduWeb transformed my understanding of complex topics. The video tutorials are incredibly clear and helped me ace my board exams!",
      rating: 5,
      subject: "Mathematics & Physics"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Class 11 Student",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80",
      text: "The previous year questions section is amazing. I practiced extensively and improved my scores by 40%. Highly recommended!",
      rating: 5,
      subject: "Chemistry & Biology"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Class 10 Graduate",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&q=80",
      text: "Amazing platform with excellent content quality. The 24/7 support helped me whenever I was stuck. Thank you EduWeb!",
      rating: 5,
      subject: "All Subjects"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge hero__badge--new">
              <span className="hero__badge-icon">✨</span>
              <span className="hero__badge-text">New Courses Available</span>
              <span className="hero__badge-pulse"></span>
            </div>

            <h1 className="hero__title">
              Transform Your <span className="hero__title-highlight">Learning</span>
              <br />Journey Today
            </h1>

            <div className="hero__subtitle">
              <span className="hero__subtitle-icon">🚀</span>
              <span>Join 10,000+ students achieving academic excellence</span>
            </div>

            <p className="hero__description">
              Master your studies with our comprehensive platform featuring expert video tutorials,
              practice questions, and personalized guidance for Classes 10, 11, and 12.
              <strong>Start your success story today!</strong>
            </p>

            <div className="hero__features">
              <div className="hero__feature">
                <span className="hero__feature-icon">📚</span>
                <span>500+ Video Lessons</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">📝</span>
                <span>1000+ Practice Questions</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">🏆</span>
                <span>95% Success Rate</span>
              </div>
            </div>

            <div className="hero__actions">
              <Link to="/signup" className="hero__cta-primary">
                <span>Start Learning Free</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/dashboard" className="hero__cta-secondary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M8 5v10l7-5z" fill="currentColor"/>
                </svg>
                <span>Watch Demo</span>
              </Link>
            </div>

            <div className="hero__trust">
              <span className="hero__trust-text">Trusted by students from</span>
              <div className="hero__trust-logos">
                <span className="trust-logo">🏫 CBSE</span>
                <span className="trust-logo">🎓 ICSE</span>
                <span className="trust-logo">📖 State Boards</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-container">
              <div className="hero__floating-card hero__floating-card--1">
                <div className="hero__card-icon">📚</div>
                <div className="hero__card-content">
                  <h4>Mathematics</h4>
                  <p>Advanced Algebra</p>
                  <div className="hero__card-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '85%'}}></div>
                    </div>
                    <span>85% Complete</span>
                  </div>
                </div>
              </div>

              <div className="hero__floating-card hero__floating-card--2">
                <div className="hero__card-icon">🧪</div>
                <div className="hero__card-content">
                  <h4>Chemistry</h4>
                  <p>Organic Compounds</p>
                  <div className="hero__card-stats">
                    <span className="stat">⭐ 4.9</span>
                    <span className="stat">👥 2.5K</span>
                  </div>
                </div>
              </div>

              <div className="hero__floating-card hero__floating-card--3">
                <div className="hero__card-icon">⚡</div>
                <div className="hero__card-content">
                  <h4>Physics</h4>
                  <p>Electromagnetism</p>
                  <div className="hero__card-badge">
                    <span>🔥 Trending</span>
                  </div>
                </div>
              </div>

              <div className="hero__floating-card hero__floating-card--4">
                <div className="hero__card-icon">🎯</div>
                <div className="hero__card-content">
                  <h4>Live Session</h4>
                  <p>Starting in 15 min</p>
                  <div className="hero__card-live">
                    <span className="live-dot"></span>
                    <span>Join Now</span>
                  </div>
                </div>
              </div>

              <div className="hero__main-image">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Students learning together" />
                <div className="hero__image-overlay">
                  <div className="hero__play-button">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                      <path d="M23 18v24l18-12z" fill="var(--primary-600)"/>
                    </svg>
                  </div>
                  <div className="hero__image-stats">
                    <div className="image-stat">
                      <span className="stat-number">10K+</span>
                      <span className="stat-label">Happy Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__background">
          <div className="hero__gradient"></div>
          <div className="hero__pattern"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" data-animate id="features">
        <div className="features__container">
          <div className="features__header">
            <div className="features__badge">
              <span className="features__badge-icon">🌟</span>
              <span>Why Students Love Us</span>
            </div>
            <h2 className="features__title">
              Everything You Need to <span className="features__title-highlight">Excel</span>
            </h2>
            <p className="features__description">
              Comprehensive learning tools designed to help you achieve academic success
            </p>
          </div>
          <div className="features__grid">
            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--primary-100)"/>
                  <path d="M16 20h16M16 24h16M16 28h12" stroke="var(--primary-600)" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="12" y="16" width="24" height="20" rx="2" stroke="var(--primary-600)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Video Tutorials</h3>
              <p className="feature-card__description">
                Learn at your own pace with high-quality video lessons created by expert educators.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">500+ Videos</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--secondary-100)"/>
                  <path d="M24 12v24M12 24h24" stroke="var(--secondary-600)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="10" stroke="var(--secondary-600)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Previous Year Questions</h3>
              <p className="feature-card__description">
                Practice with real exam questions from past years to boost your confidence and performance.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">1000+ Questions</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--success-100)"/>
                  <path d="M16 24l6 6 12-12" stroke="var(--success-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="12" stroke="var(--success-600)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Model Questions</h3>
              <p className="feature-card__description">
                Test your knowledge with expertly crafted model papers designed to simulate real exams.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">200+ Papers</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--warning-100)"/>
                  <path d="M24 16v8l4 4" stroke="var(--warning-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="12" stroke="var(--warning-600)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-card__title">24/7 Support</h3>
              <p className="feature-card__description">
                Get help whenever you need it with our round-the-clock student support system.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Always Available</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--info-100)"/>
                  <path d="M24 32V16M16 24h16" stroke="var(--info-600)" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="14" y="14" width="20" height="20" rx="2" stroke="var(--info-600)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Progress Tracking</h3>
              <p className="feature-card__description">
                Monitor your learning progress with detailed analytics and performance insights.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Real-time Analytics</span>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="var(--primary-100)"/>
                  <path d="M20 28l4-4 4 4M24 24V12" stroke="var(--primary-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M36 20v16a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V20" stroke="var(--primary-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-card__title">Downloadable Content</h3>
              <p className="feature-card__description">
                Access study materials offline with downloadable PDFs and practice sheets.
              </p>
              <div className="feature-card__stats">
                <span className="feature-card__stat">Offline Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" data-animate id="testimonials">
        <div className="testimonials__container">
          <div className="testimonials__header">
            <div className="testimonials__badge">
              <span className="testimonials__badge-icon">💬</span>
              <span>Student Success Stories</span>
            </div>
            <h2 className="testimonials__title">
              Hear From Our <span className="testimonials__title-highlight">Successful</span> Students
            </h2>
            <p className="testimonials__description">
              Real stories from students who transformed their academic journey with EduWeb
            </p>
          </div>

          <div className="testimonials__carousel">
            <div className="testimonial-carousel">
              <div
                className="testimonial-carousel__track"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="testimonial-slide">
                    <div className="testimonial-card testimonial-card--featured">
                      <div className="testimonial-card__quote">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                          <path d="M10 20c0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h6v10H10V20zM30 20c0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6h6v10H30V20z" fill="var(--primary-200)"/>
                        </svg>
                      </div>

                      <div className="testimonial-card__rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">⭐</span>
                        ))}
                      </div>

                      <p className="testimonial-card__text">
                        "{testimonial.text}"
                      </p>

                      <div className="testimonial-card__author">
                        <div className="testimonial-card__avatar">
                          <img src={testimonial.image} alt={testimonial.name} />
                        </div>
                        <div className="testimonial-card__info">
                          <h4 className="testimonial-card__name">{testimonial.name}</h4>
                          <p className="testimonial-card__role">{testimonial.role}</p>
                          <p className="testimonial-card__subject">{testimonial.subject}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="testimonial-carousel__controls">
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentTestimonial ? 'carousel-dot--active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="carousel-nav">
                <button
                  className="carousel-btn carousel-btn--prev"
                  onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className="carousel-btn carousel-btn--next"
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="testimonials__stats">
            <div className="testimonial-stat">
              <span className="testimonial-stat__number">10,000+</span>
              <span className="testimonial-stat__label">Happy Students</span>
            </div>
            <div className="testimonial-stat">
              <span className="testimonial-stat__number">4.9/5</span>
              <span className="testimonial-stat__label">Average Rating</span>
            </div>
            <div className="testimonial-stat">
              <span className="testimonial-stat__number">95%</span>
              <span className="testimonial-stat__label">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="demo-section" data-animate id="demo">
        <div className="demo-section__container">
          <div className="demo-section__content">
            <div className="demo-section__header">
              <h2 className="demo-section__title">
                Experience Learning Like Never Before
              </h2>
              <p className="demo-section__description">
                See how our interactive platform makes complex topics simple and engaging
              </p>
            </div>

            <div className="demo-section__preview">
              <div className="demo-preview">
                <div className="demo-preview__header">
                  <div className="demo-preview__controls">
                    <span className="control-dot control-dot--red"></span>
                    <span className="control-dot control-dot--yellow"></span>
                    <span className="control-dot control-dot--green"></span>
                  </div>
                  <div className="demo-preview__title">EduWeb Learning Platform</div>
                </div>
                <div className="demo-preview__content">
                  <div className="demo-preview__sidebar">
                    <div className="demo-nav-item demo-nav-item--active">📚 Mathematics</div>
                    <div className="demo-nav-item">🧪 Chemistry</div>
                    <div className="demo-nav-item">⚡ Physics</div>
                    <div className="demo-nav-item">🌱 Biology</div>
                  </div>
                  <div className="demo-preview__main">
                    <div className="demo-video">
                      <div className="demo-video__thumbnail">
                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&w=400&q=80" alt="Math lesson" />
                        <div className="demo-video__play">
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="20" r="20" fill="rgba(255, 255, 255, 0.9)"/>
                            <path d="M15 12v16l12-8z" fill="var(--primary-600)"/>
                          </svg>
                        </div>
                      </div>
                      <div className="demo-video__info">
                        <h4>Quadratic Equations - Complete Guide</h4>
                        <p>Learn step-by-step solutions with interactive examples</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-animate id="cta">
        <div className="cta-section__container">
          <div className="cta-section__content">
            <div className="cta-section__badge">
              <span className="cta-section__badge-icon">🎯</span>
              <span>Ready to Excel?</span>
            </div>

            <h2 className="cta-section__title">
              Start Your Success Story Today
            </h2>

            <p className="cta-section__description">
              Join thousands of students who have transformed their academic journey with EduWeb.
              Your path to excellence starts here.
            </p>

            <div className="cta-section__actions">
              <Link to="/signup" className="cta-section__btn-primary">
                <span>Start Learning Free</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/dashboard" className="cta-section__btn-secondary">
                <span>Explore Dashboard</span>
              </Link>
            </div>

            <div className="cta-section__features">
              <div className="cta-feature">
                <span className="cta-feature__icon">✅</span>
                <span className="cta-feature__text">Instant access to all content</span>
              </div>
              <div className="cta-feature">
                <span className="cta-feature__icon">✅</span>
                <span className="cta-feature__text">No credit card required</span>
              </div>
              <div className="cta-feature">
                <span className="cta-feature__icon">✅</span>
                <span className="cta-feature__text">24/7 student support</span>
              </div>
            </div>
          </div>

          <div className="cta-section__visual">
            <div className="cta-visual">
              <div className="cta-visual__circle cta-visual__circle--1"></div>
              <div className="cta-visual__circle cta-visual__circle--2"></div>
              <div className="cta-visual__circle cta-visual__circle--3"></div>
              <div className="cta-visual__icon">🚀</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;