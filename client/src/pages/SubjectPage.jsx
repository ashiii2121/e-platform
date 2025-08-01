import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { keralaHSESubjects, generateExamPapers } from '../data/keralaHSEData';
import './SubjectPage.css';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [examPapers, setExamPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the subject across all classes
    let foundSubject = null;
    let className = '';
    
    Object.entries(keralaHSESubjects).forEach(([classKey, classData]) => {
      const subjectFound = classData.subjects.find(s => s.id === subjectId);
      if (subjectFound) {
        foundSubject = subjectFound;
        className = classData.name;
      }
    });

    if (foundSubject) {
      setSubject({ ...foundSubject, className });
      const papers = generateExamPapers(foundSubject.id, foundSubject.name, className);
      setExamPapers(papers);
      setFilteredPapers(papers);
    }
    
    setLoading(false);
  }, [subjectId]);

  useEffect(() => {
    let filtered = examPapers;

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(paper => paper.year === selectedYear);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(paper => paper.difficulty.toLowerCase() === selectedDifficulty);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.year.includes(searchTerm) ||
        paper.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPapers(filtered);
  }, [examPapers, selectedYear, selectedDifficulty, searchTerm]);

  const getYearOptions = () => {
    const years = [...new Set(examPapers.map(paper => paper.year))];
    return years.sort((a, b) => b - a);
  };

  const handleDownload = (paper) => {
    if (paper.isAvailable) {
      // In a real app, this would trigger the actual download
      alert(`Downloading ${paper.title}...`);
    } else {
      alert('This paper is not available for download yet.');
    }
  };

  if (loading) {
    return (
      <div className="subject-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading exam papers...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="subject-page">
        <div className="error-container">
          <h2>Subject Not Found</h2>
          <p>The requested subject could not be found.</p>
          <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-page">
      {/* Header */}
      <div className="subject-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link>
          <span>›</span>
          <span>{subject.className}</span>
          <span>›</span>
          <span>{subject.name}</span>
        </div>
        
        <div className="subject-info">
          <div className="subject-icon-large">{subject.icon}</div>
          <div className="subject-details">
            <h1>{subject.name}</h1>
            <p className="subject-class">{subject.className}</p>
            <p className="subject-description">{subject.description}</p>
          </div>
        </div>

        <div className="subject-stats">
          <div className="stat-item">
            <span className="stat-number">{examPapers.length}</span>
            <span className="stat-label">Total Papers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{examPapers.filter(p => p.isAvailable).length}</span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">26</span>
            <span className="stat-label">Years</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="dropdown-filters">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Years</option>
            {getYearOptions().map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="papers-section">
        <div className="section-header">
          <h2>Exam Papers ({filteredPapers.length})</h2>
          <div className="view-options">
            <button className="view-btn active">Grid</button>
            <button className="view-btn">List</button>
          </div>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="no-papers">
            <span className="no-papers-icon">📄</span>
            <h3>No papers found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="papers-grid">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className={`paper-card ${!paper.isAvailable ? 'unavailable' : ''}`}>
                <div className="paper-header">
                  <div className="paper-year">{paper.year}</div>
                  <div className={`difficulty-badge ${paper.difficulty.toLowerCase()}`}>
                    {paper.difficulty}
                  </div>
                </div>
                
                <div className="paper-content">
                  <h3 className="paper-title">{paper.title}</h3>
                  <p className="paper-type">{paper.type} - {paper.month}</p>
                  
                  <div className="paper-details">
                    <span className="detail-item">
                      📄 {paper.pages} pages
                    </span>
                    <span className="detail-item">
                      💾 {paper.fileSize}
                    </span>
                  </div>
                  
                  <div className="paper-topics">
                    {paper.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                    {paper.topics.length > 3 && (
                      <span className="topic-tag more">+{paper.topics.length - 3}</span>
                    )}
                  </div>
                </div>
                
                <div className="paper-actions">
                  <button
                    className={`btn-download ${!paper.isAvailable ? 'disabled' : ''}`}
                    onClick={() => handleDownload(paper)}
                    disabled={!paper.isAvailable}
                  >
                    {paper.isAvailable ? '⬇️ Download PDF' : '🔒 Not Available'}
                  </button>
                  <button className="btn-preview">👁️ Preview</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download All Section */}
      <div className="download-all-section">
        <div className="download-all-card">
          <h3>Download All Available Papers</h3>
          <p>Get all {examPapers.filter(p => p.isAvailable).length} available papers for {subject.name} in a single ZIP file</p>
          <button className="btn-download-all">
            📦 Download All ({(examPapers.filter(p => p.isAvailable).length * 2.5).toFixed(1)} MB)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
