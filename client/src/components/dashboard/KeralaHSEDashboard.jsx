import React, { useState } from 'react';
import { keralaHSESubjects } from '../../data/keralaHSEData';
import './KeralaHSEDashboard.css';

const KeralaHSEDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('class10');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSubjects = keralaHSESubjects[selectedClass].subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClassStats = (classKey) => {
    const subjects = keralaHSESubjects[classKey].subjects;
    return {
      totalSubjects: subjects.length,
      totalPapers: subjects.length * 26, // 26 years (2000-2025)
      availablePapers: subjects.length * 11 // 11 years (2015-2025)
    };
  };

  return (
    <div className="kerala-hse-dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="kerala-flag">🏛️</span>
            Kerala HSE Previous Papers
          </h1>
          <p className="dashboard-subtitle">
            Access previous year question papers from 2000-2025 for all Kerala HSE subjects
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Class Selection Tabs */}
      <div className="class-tabs">
        {Object.entries(keralaHSESubjects).map(([key, classData]) => {
          const stats = getClassStats(key);
          return (
            <button
              key={key}
              className={`class-tab ${selectedClass === key ? 'active' : ''}`}
              onClick={() => setSelectedClass(key)}
            >
              <div className="tab-content">
                <h3>{classData.name}</h3>
                <div className="tab-stats">
                  <span>{stats.totalSubjects} Subjects</span>
                  <span>{stats.availablePapers} Papers</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        {(() => {
          const stats = getClassStats(selectedClass);
          return (
            <>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3>{stats.totalSubjects}</h3>
                  <p>Total Subjects</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                  <h3>{stats.totalPapers}</h3>
                  <p>Total Papers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{stats.availablePapers}</h3>
                  <p>Available Papers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>26</h3>
                  <p>Years Covered</p>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Subjects Grid */}
      <div className="subjects-section">
        <h2 className="section-title">
          {keralaHSESubjects[selectedClass].name} Subjects
        </h2>
        
        {filteredSubjects.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No subjects found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="subjects-grid">
            {filteredSubjects.map((subject) => (
              <div key={subject.id} className="subject-card">
                <div className="subject-header">
                  <div className="subject-icon">{subject.icon}</div>
                  <div className="subject-info">
                    <h3 className="subject-name">{subject.name}</h3>
                    <span className="subject-code">{subject.code}</span>
                  </div>
                </div>
                
                <p className="subject-description">{subject.description}</p>
                
                <div className="subject-stats">
                  <div className="stat-item">
                    <span className="stat-label">Papers Available:</span>
                    <span className="stat-value">26 Years</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Latest:</span>
                    <span className="stat-value">2025</span>
                  </div>
                </div>
                
                <div className="subject-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => window.location.href = `/subject/${subject.id}`}
                  >
                    View Papers
                  </button>
                  <button className="btn-secondary">
                    Quick Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Sources */}
      <div className="sources-section">
        <h2 className="section-title">Official Sources</h2>
        <div className="sources-grid">
          <div className="source-card">
            <h4>Kerala DHSE Portal</h4>
            <p>Official Kerala Directorate of Higher Secondary Education</p>
            <a href="https://dhsekerala.gov.in" target="_blank" rel="noopener noreferrer" className="source-link">
              Visit Site →
            </a>
          </div>
          <div className="source-card">
            <h4>Education Observer</h4>
            <p>Comprehensive collection of Kerala HSE papers</p>
            <a href="https://educationobserver.com" target="_blank" rel="noopener noreferrer" className="source-link">
              Visit Site →
            </a>
          </div>
          <div className="source-card">
            <h4>HSS Live</h4>
            <p>Kerala Higher Secondary education portal</p>
            <a href="https://hsslive.in" target="_blank" rel="noopener noreferrer" className="source-link">
              Visit Site →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeralaHSEDashboard;
