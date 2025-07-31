import React from 'react';

const Header = ({ activeSection, setActiveSection }) => {
  return (
    <header className="dashboard__header">
      <h1>Dashboard</h1>
      <div className="dashboard__tabs">
        <button
          className={`tab ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeSection === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveSection('videos')}
        >
          Videos
        </button>
        <button
          className={`tab ${activeSection === 'previous-papers' ? 'active' : ''}`}
          onClick={() => setActiveSection('previous-papers')}
        >
          Previous Papers
        </button>
        <button
          className={`tab ${activeSection === 'model-tests' ? 'active' : ''}`}
          onClick={() => setActiveSection('model-tests')}
        >
          Model Tests
        </button>
        <button
          className={`tab ${activeSection === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveSection('progress')}
        >
          Progress
        </button>
      </div>
    </header>
  );
};

export default Header;