import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

function DashboardPage() {
  const [videos, setVideos] = useState([]);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [modelQuestions, setModelQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  // Mock data for demonstration
  const mockVideos = [
    {
      _id: '1',
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      duration: '45 min',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=example1',
      description: 'Master the basics of algebra with step-by-step explanations'
    },
    {
      _id: '2',
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      duration: '60 min',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=example2',
      description: 'Introduction to organic compounds and reactions'
    },
    {
      _id: '3',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      duration: '50 min',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=example3',
      description: 'Understanding the fundamental laws of motion'
    },
    {
      _id: '4',
      title: 'Cell Biology',
      subject: 'Biology',
      duration: '55 min',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=example4',
      description: 'Explore the structure and function of cells'
    }
  ];

  const mockPreviousQuestions = [
    {
      _id: '1',
      title: 'Mathematics Board Exam 2023',
      subject: 'Mathematics',
      standard: 'Class 12',
      year: '2023',
      pdfUrl: '#'
    },
    {
      _id: '2',
      title: 'Physics Board Exam 2023',
      subject: 'Physics',
      standard: 'Class 12',
      year: '2023',
      pdfUrl: '#'
    },
    {
      _id: '3',
      title: 'Chemistry Board Exam 2022',
      subject: 'Chemistry',
      standard: 'Class 11',
      year: '2022',
      pdfUrl: '#'
    }
  ];

  const mockModelQuestions = [
    {
      _id: '1',
      title: 'Mathematics Model Paper - Set A',
      subject: 'Mathematics',
      standard: 'Class 12',
      difficulty: 'Medium',
      pdfUrl: '#'
    },
    {
      _id: '2',
      title: 'Physics Practice Test - Set B',
      subject: 'Physics',
      standard: 'Class 11',
      difficulty: 'Hard',
      pdfUrl: '#'
    },
    {
      _id: '3',
      title: 'Chemistry Mock Exam - Set C',
      subject: 'Chemistry',
      standard: 'Class 10',
      difficulty: 'Easy',
      pdfUrl: '#'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setPreviousQuestions(mockPreviousQuestions);
      setModelQuestions(mockModelQuestions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="dashboard__overview">
      <div className="dashboard__welcome">
        <h1>Welcome back, Student! 👋</h1>
        <p>Continue your learning journey with our comprehensive resources</p>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__icon">📚</div>
          <div className="stat-card__content">
            <h3>{videos.length}</h3>
            <p>Video Tutorials</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">📝</div>
          <div className="stat-card__content">
            <h3>{previousQuestions.length}</h3>
            <p>Previous Papers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">🎯</div>
          <div className="stat-card__content">
            <h3>{modelQuestions.length}</h3>
            <p>Model Tests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card__icon">⭐</div>
          <div className="stat-card__content">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard__quick-access">
        <h2>Quick Access</h2>
        <div className="quick-access-grid">
          <button
            className="quick-access-card"
            onClick={() => setActiveSection('videos')}
          >
            <div className="quick-access-card__icon">🎥</div>
            <h3>Watch Videos</h3>
            <p>Continue learning with video tutorials</p>
          </button>
          <button
            className="quick-access-card"
            onClick={() => setActiveSection('previous-questions')}
          >
            <div className="quick-access-card__icon">📋</div>
            <h3>Practice Papers</h3>
            <p>Solve previous year questions</p>
          </button>
          <button
            className="quick-access-card"
            onClick={() => setActiveSection('model-questions')}
          >
            <div className="quick-access-card__icon">🧪</div>
            <h3>Take Tests</h3>
            <p>Attempt model question papers</p>
          </button>
          <Link to="/payment" className="quick-access-card">
            <div className="quick-access-card__icon">💎</div>
            <h3>Upgrade Plan</h3>
            <p>Access premium features</p>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <aside className="dashboard__sidebar">
        <div className="sidebar__header">
          <h2>Dashboard</h2>
        </div>
        <nav className="sidebar__nav">
          <button
            className={`nav-item ${activeSection === 'overview' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <span className="nav-item__icon">🏠</span>
            <span className="nav-item__text">Overview</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'videos' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveSection('videos')}
          >
            <span className="nav-item__icon">🎥</span>
            <span className="nav-item__text">Video Tutorials</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'previous-questions' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveSection('previous-questions')}
          >
            <span className="nav-item__icon">📝</span>
            <span className="nav-item__text">Previous Papers</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'model-questions' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveSection('model-questions')}
          >
            <span className="nav-item__icon">🎯</span>
            <span className="nav-item__text">Model Tests</span>
          </button>
          <button
            className={`nav-item ${activeSection === 'progress' ? 'nav-item--active' : ''}`}
            onClick={() => setActiveSection('progress')}
          >
            <span className="nav-item__icon">📊</span>
            <span className="nav-item__text">Progress</span>
          </button>
        </nav>
      </aside>

      <main className="dashboard__main">
        <div className="dashboard__content">
          {activeSection === 'overview' && renderOverview()}

          {activeSection === 'videos' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Video Tutorials</h1>
                <p>Learn with our comprehensive video library</p>
              </div>
              <div className="video-grid">
                {videos.map((video) => (
                  <div className="video-card" key={video._id}>
                    <div className="video-card__thumbnail">
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="video-card__overlay">
                        <button className="play-button">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M8 5v14l11-7z" fill="currentColor"/>
                          </svg>
                        </button>
                      </div>
                      <span className="video-card__duration">{video.duration}</span>
                    </div>
                    <div className="video-card__content">
                      <h3>{video.title}</h3>
                      <p className="video-card__subject">{video.subject}</p>
                      <p className="video-card__description">{video.description}</p>
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--small">
                        Watch Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'previous-questions' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Previous Year Questions</h1>
                <p>Practice with real exam papers from previous years</p>
              </div>
              <div className="question-grid">
                {previousQuestions.map((question) => (
                  <div className="question-card" key={question._id}>
                    <div className="question-card__header">
                      <div className="question-card__icon">📝</div>
                      <div className="question-card__meta">
                        <span className="question-card__year">{question.year}</span>
                        <span className="question-card__subject">{question.subject}</span>
                      </div>
                    </div>
                    <div className="question-card__content">
                      <h3>{question.title}</h3>
                      <p>Standard: {question.standard}</p>
                      <div className="question-card__actions">
                        <a href={question.pdfUrl} className="btn btn--outline btn--small">
                          View PDF
                        </a>
                        <button className="btn btn--primary btn--small">
                          Start Practice
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'model-questions' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Model Question Papers</h1>
                <p>Test your knowledge with expertly crafted model papers</p>
              </div>
              <div className="question-grid">
                {modelQuestions.map((question) => (
                  <div className="question-card" key={question._id}>
                    <div className="question-card__header">
                      <div className="question-card__icon">🎯</div>
                      <div className="question-card__meta">
                        <span className={`difficulty-badge difficulty-badge--${question.difficulty.toLowerCase()}`}>
                          {question.difficulty}
                        </span>
                        <span className="question-card__subject">{question.subject}</span>
                      </div>
                    </div>
                    <div className="question-card__content">
                      <h3>{question.title}</h3>
                      <p>Standard: {question.standard}</p>
                      <div className="question-card__actions">
                        <a href={question.pdfUrl} className="btn btn--outline btn--small">
                          Download
                        </a>
                        <button className="btn btn--primary btn--small">
                          Take Test
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'progress' && (
            <div className="content-section">
              <div className="section-header">
                <h1>Your Progress</h1>
                <p>Track your learning journey and achievements</p>
              </div>
              <div className="progress-section">
                <div className="progress-card">
                  <h3>Overall Progress</h3>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{width: '75%'}}></div>
                  </div>
                  <p>75% Complete</p>
                </div>
                <div className="progress-card">
                  <h3>Videos Watched</h3>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{width: '60%'}}></div>
                  </div>
                  <p>12 of 20 videos</p>
                </div>
                <div className="progress-card">
                  <h3>Tests Completed</h3>
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{width: '40%'}}></div>
                  </div>
                  <p>4 of 10 tests</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;