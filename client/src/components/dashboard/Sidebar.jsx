import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
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
          className={`nav-item ${activeSection === 'previous-papers' ? 'nav-item--active' : ''}`}
          onClick={() => setActiveSection('previous-papers')}
        >
          <span className="nav-item__icon">📝</span>
          <span className="nav-item__text">Previous Papers</span>
        </button>
        <button
          className={`nav-item ${activeSection === 'model-tests' ? 'nav-item--active' : ''}`}
          onClick={() => setActiveSection('model-tests')}
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
  );
};

export default Sidebar;