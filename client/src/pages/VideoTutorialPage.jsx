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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'popular', 'rating'
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    },
    {
      _id: '7',
      title: 'Calculus - Derivatives and Applications',
      subject: 'Mathematics',
      standard: 'Class 12',
      duration: '75 min',
      views: '15.8K',
      rating: 4.9,
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Master calculus derivatives with real-world applications and problem-solving techniques.',
      topics: ['Derivatives', 'Chain Rule', 'Applications', 'Optimization'],
      difficulty: 'Advanced',
      uploadDate: '2024-01-20'
    },
    {
      _id: '8',
      title: 'Genetics and Heredity',
      subject: 'Biology',
      standard: 'Class 12',
      duration: '50 min',
      views: '9.2K',
      rating: 4.7,
      instructor: 'Dr. James Wilson',
      thumbnail: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?ixlib=rb-4.0.3&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'Understand the principles of genetics, DNA structure, and inheritance patterns.',
      topics: ['DNA Structure', 'Mendel\'s Laws', 'Genetic Disorders', 'Evolution'],
      difficulty: 'Intermediate',
      uploadDate: '2024-01-18'
    }
  ];

  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const standards = ['all', 'Class 10', 'Class 11', 'Class 12'];

  // Interactive functions
  const toggleFavorite = (videoId) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const toggleWatchLater = (videoId) => {
    setWatchLater(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleSort = (videos) => {
    switch (sortBy) {
      case 'popular':
        return [...videos].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
      case 'rating':
        return [...videos].sort((a, b) => b.rating - a.rating);
      case 'newest':
      default:
        return [...videos].sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }
  };

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

    // Apply sorting
    const sorted = handleSort(filtered);
    setFilteredVideos(sorted);
  }, [videos, selectedSubject, selectedStandard, searchQuery, sortBy]);

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
            <div className="hero__badge">
              <span className="hero__badge-icon">🎬</span>
              <span>Premium Video Content</span>
            </div>
            <h1 className="hero__title">
              Master Every Subject with <span className="hero__title-highlight">Expert Video Tutorials</span>
            </h1>
            <p className="hero__description">
              Unlock your potential with our comprehensive video library featuring expert educators,
              interactive content, and personalized learning paths designed for academic excellence.
            </p>
            <div className="hero__features">
              <div className="hero__feature">
                <span className="hero__feature-icon">🎯</span>
                <span>Targeted Learning</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">📱</span>
                <span>Mobile Friendly</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">⚡</span>
                <span>HD Quality</span>
              </div>
            </div>
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
              <div className="hero__stat">
                <span className="hero__stat-number">4.8★</span>
                <span className="hero__stat-label">Average Rating</span>
              </div>
            </div>

            <div className="hero__cta">
              <button
                className="hero__cta-btn"
                onClick={() => document.querySelector('.filters__search input').focus()}
              >
                <span>Start Learning Now</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__video-preview">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&w=600&q=80"
                alt="Students learning"
              />
              <div className="hero__play-button" onClick={() => setSelectedVideo(mockVideos[0])}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.9)"/>
                  <path d="M23 18v24l18-12z" fill="var(--primary-600)"/>
                </svg>
              </div>
              <div className="hero__video-info">
                <h3>Featured: Algebra Fundamentals</h3>
                <p>Watch our most popular tutorial</p>
              </div>
            </div>
            <div className="hero__floating-elements">
              <div className="floating-element floating-element--1">
                <span className="floating-icon">📚</span>
                <span>500+ Lessons</span>
              </div>
              <div className="floating-element floating-element--2">
                <span className="floating-icon">🏆</span>
                <span>95% Success</span>
              </div>
              <div className="floating-element floating-element--3">
                <span className="floating-icon">⭐</span>
                <span>4.8 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="video-tutorials__filters">
        <div className="filters__container">
          <div className="filters__main">
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
                {searchQuery && (
                  <button
                    className="search-box__clear"
                    onClick={() => setSearchQuery('')}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="filters__controls">
              <button
                className={`filter-toggle ${isFilterOpen ? 'filter-toggle--active' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h4a1 1 0 110 2H4a1 1 0 01-1-1z" fill="currentColor"/>
                </svg>
                <span>Filters</span>
              </button>

              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                    <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button
                  className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`filters__dropdown ${isFilterOpen ? 'filters__dropdown--open' : ''}`}>
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

            <div className="filter-group">
              <label htmlFor="sort-filter">Sort by:</label>
              <select
                id="sort-filter"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="filter-actions">
              <button
                className="btn btn--outline btn--small"
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedStandard('all');
                  setSortBy('newest');
                  setSearchQuery('');
                }}
              >
                Clear All
              </button>
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

          {filteredVideos.length === 0 ? (
            <div className="no-results">
              <div className="no-results__icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M22 32h20M32 22v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="no-results__title">No videos found</h3>
              <p className="no-results__description">
                Try adjusting your search criteria or browse all available videos.
              </p>
              <button
                className="no-results__btn"
                onClick={() => {
                  setSelectedSubject('all');
                  setSelectedStandard('all');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
              >
                Show All Videos
              </button>
            </div>
          ) : (
            <div className={`video-grid ${viewMode === 'list' ? 'video-grid--list' : ''}`}>
              {filteredVideos.map((video) => (
              <div
                key={video._id}
                className={`video-card ${viewMode === 'list' ? 'video-card--list' : ''}`}
              >
                <div className="video-card__thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-card__overlay">
                    <button
                      className="play-button"
                      onClick={() => setSelectedVideo(video)}
                    >
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
                  <div className="video-card__actions">
                    <button
                      className={`action-btn ${favorites.includes(video._id) ? 'action-btn--active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(video._id);
                      }}
                      title="Add to favorites"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.885.837-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748z" fill={favorites.includes(video._id) ? '#ef4444' : 'currentColor'}/>
                      </svg>
                    </button>
                    <button
                      className={`action-btn ${watchLater.includes(video._id) ? 'action-btn--active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchLater(video._id);
                      }}
                      title="Watch later"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="currentColor"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" fill="currentColor"/>
                      </svg>
                    </button>
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
