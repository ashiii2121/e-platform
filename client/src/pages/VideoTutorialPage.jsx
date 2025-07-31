import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './VideoTutorialPage.css';

function VideoTutorialPage() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStandard, setSelectedStandard] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Mock video data with more comprehensive content
  const mockVideos = [
    {
      _id: '1',
      title: 'Algebra Fundamentals - Linear Equations',
      subject: 'Mathematics',
      standard: 'Class 10',
      duration: '45 min',
      views: '12.5K',
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Master the fundamentals of linear equations with step-by-step explanations and practical examples.',
      topics: ['Linear Equations', 'Solving Methods', 'Word Problems'],
      difficulty: 'Beginner',
      uploadDate: '2024-01-15'
    },
    {
      _id: '2',
      title: 'Organic Chemistry - Hydrocarbons',
      subject: 'Chemistry',
      standard: 'Class 11',
      duration: '60 min',
      views: '8.3K',
      rating: 4.9,
      instructor: 'Prof. Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Comprehensive guide to hydrocarbons including alkanes, alkenes, and alkynes with their properties.',
      topics: ['Alkanes', 'Alkenes', 'Alkynes', 'IUPAC Naming'],
      difficulty: 'Intermediate',
      uploadDate: '2024-01-10'
    },
    {
      _id: '3',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      standard: 'Class 11',
      duration: '50 min',
      views: '15.2K',
      rating: 4.7,
      instructor: 'Dr. Emily Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Understanding the three fundamental laws of motion with real-world applications and examples.',
      topics: ['First Law', 'Second Law', 'Third Law', 'Applications'],
      difficulty: 'Intermediate',
      uploadDate: '2024-01-08'
    },
    {
      _id: '4',
      title: 'Cell Biology - Structure and Function',
      subject: 'Biology',
      standard: 'Class 12',
      duration: '55 min',
      views: '9.7K',
      rating: 4.6,
      instructor: 'Dr. James Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Explore the intricate structure and function of cells, from organelles to cellular processes.',
      topics: ['Cell Organelles', 'Cell Membrane', 'Cellular Processes'],
      difficulty: 'Advanced',
      uploadDate: '2024-01-05'
    },
    {
      _id: '5',
      title: 'Quadratic Equations - Complete Guide',
      subject: 'Mathematics',
      standard: 'Class 10',
      duration: '40 min',
      views: '11.8K',
      rating: 4.8,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Complete guide to quadratic equations including factoring, completing the square, and quadratic formula.',
      topics: ['Factoring', 'Quadratic Formula', 'Graphing', 'Applications'],
      difficulty: 'Intermediate',
      uploadDate: '2024-01-12'
    },
    {
      _id: '6',
      title: 'Thermodynamics - Laws and Applications',
      subject: 'Physics',
      standard: 'Class 12',
      duration: '65 min',
      views: '7.4K',
      rating: 4.9,
      instructor: 'Dr. Emily Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Master the laws of thermodynamics and their practical applications in engineering and physics.',
      topics: ['First Law', 'Second Law', 'Entropy', 'Heat Engines'],
      difficulty: 'Advanced',
      uploadDate: '2024-01-03'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const standards = ['all', 'Class 10', 'Class 11', 'Class 12'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setFilteredVideos(mockVideos);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = videos;

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(video => video.subject === selectedSubject);
    }

    // Filter by standard
    if (selectedStandard !== 'all') {
      filtered = filtered.filter(video => video.standard === selectedStandard);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredVideos(filtered);
  }, [videos, selectedSubject, selectedStandard, searchQuery]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'var(--success)';
      case 'Intermediate': return 'var(--warning)';
      case 'Advanced': return 'var(--error)';
      default: return 'var(--gray-500)';
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star star--filled">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star star--half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star star--empty">☆</span>);
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="video-tutorials">
        <div className="video-tutorials__loading">
          <div className="loading-spinner"></div>
          <p>Loading video tutorials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="video-tutorials">
      {/* Hero Section */}
      <section className="video-tutorials__hero">
        <div className="hero__container">
          <div className="hero__content">
            <h1 className="hero__title">
              Video <span className="hero__title-highlight">Tutorials</span>
            </h1>
            <p className="hero__description">
              Learn from expert educators with our comprehensive video library covering all subjects
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-number">{videos.length}+</span>
                <span className="hero__stat-label">Video Lessons</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">50+</span>
                <span className="hero__stat-label">Expert Instructors</span>
              </div>
              <div className="hero__stat">
                <span className="hero__stat-number">10K+</span>
                <span className="hero__stat-label">Students Learning</span>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__video-preview">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&w=600&q=80" 
                alt="Students learning" 
              />
              <div className="hero__play-button">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                  <path d="M23 18v24l18-12z" fill="var(--primary-600)"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="video-tutorials__filters">
        <div className="filters__container">
          <div className="filters__search">
            <div className="search-box">
              <svg className="search-box__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5l-5.5-5.5M14 8a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                placeholder="Search videos, topics, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-box__input"
              />
            </div>
          </div>

          <div className="filters__controls">
            <div className="filter-group">
              <label htmlFor="subject-filter">Subject:</label>
              <select
                id="subject-filter"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="filter-select"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="standard-filter">Standard:</label>
              <select
                id="standard-filter"
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="filter-select"
              >
                {standards.map(standard => (
                  <option key={standard} value={standard}>
                    {standard === 'all' ? 'All Standards' : standard}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="video-tutorials__content">
        <div className="content__container">
          <div className="content__header">
            <h2>
              {filteredVideos.length} Video{filteredVideos.length !== 1 ? 's' : ''} Found
            </h2>
            <p>
              {selectedSubject !== 'all' && `${selectedSubject} • `}
              {selectedStandard !== 'all' && `${selectedStandard} • `}
              Learn at your own pace
            </p>
          </div>

          <div className="video-grid">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="video-card"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="video-card__thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-card__overlay">
                    <button className="play-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M8 5v14l11-7z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                  <div className="video-card__badges">
                    <span className="video-card__duration">{video.duration}</span>
                    <span
                      className="video-card__difficulty"
                      style={{ backgroundColor: getDifficultyColor(video.difficulty) }}
                    >
                      {video.difficulty}
                    </span>
                  </div>
                </div>

                <div className="video-card__content">
                  <div className="video-card__meta">
                    <span className="video-card__subject">{video.subject}</span>
                    <span className="video-card__standard">{video.standard}</span>
                  </div>

                  <h3 className="video-card__title">{video.title}</h3>
                  <p className="video-card__description">{video.description}</p>

                  <div className="video-card__instructor">
                    <div className="instructor__avatar">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(video.instructor)}&background=random`}
                        alt={video.instructor}
                      />
                    </div>
                    <span className="instructor__name">{video.instructor}</span>
                  </div>

                  <div className="video-card__stats">
                    <div className="video-card__rating">
                      <div className="rating__stars">
                        {renderStars(video.rating)}
                      </div>
                      <span className="rating__score">{video.rating}</span>
                    </div>
                    <div className="video-card__views">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                      <span>{video.views} views</span>
                    </div>
                  </div>

                  <div className="video-card__topics">
                    {video.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="no-results">
              <div className="no-results__icon">🔍</div>
              <h3>No videos found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button
                className="btn btn--primary"
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedStandard('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal__close"
              onClick={() => setSelectedVideo(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="video-modal__player">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <div className="video-modal__info">
              <div className="video-modal__header">
                <h2>{selectedVideo.title}</h2>
                <div className="video-modal__meta">
                  <span className="meta__subject">{selectedVideo.subject}</span>
                  <span className="meta__standard">{selectedVideo.standard}</span>
                  <span
                    className="meta__difficulty"
                    style={{ color: getDifficultyColor(selectedVideo.difficulty) }}
                  >
                    {selectedVideo.difficulty}
                  </span>
                </div>
              </div>

              <p className="video-modal__description">{selectedVideo.description}</p>

              <div className="video-modal__instructor">
                <div className="instructor__avatar">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedVideo.instructor)}&background=random`}
                    alt={selectedVideo.instructor}
                  />
                </div>
                <div className="instructor__info">
                  <h4>{selectedVideo.instructor}</h4>
                  <p>Expert Educator</p>
                </div>
              </div>

              <div className="video-modal__topics">
                <h4>Topics Covered:</h4>
                <div className="topics__list">
                  {selectedVideo.topics.map((topic, index) => (
                    <span key={index} className="topic-tag topic-tag--large">{topic}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoTutorialPage;
