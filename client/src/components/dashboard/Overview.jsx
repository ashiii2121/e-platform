import React from 'react';
import { Link } from 'react-router-dom';
import DashboardStats from './DashboardStats';

const Overview = ({ videos, previousQuestions, modelQuestions, setActiveSection }) => {
  return (
    <div className="dashboard__overview">
      <div className="dashboard__welcome">
        <h1>Welcome back, Student! 👋</h1>
        <p>Continue your learning journey with our comprehensive resources</p>
      </div>

      <DashboardStats
        videos={videos}
        previousQuestions={previousQuestions}
        modelQuestions={modelQuestions}
      />

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
            onClick={() => setActiveSection('previous-papers')}
          >
            <div className="quick-access-card__icon">📋</div>
            <h3>Practice Papers</h3>
            <p>Solve previous year questions</p>
          </button>
          <button
            className="quick-access-card"
            onClick={() => setActiveSection('model-tests')}
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
};

export default Overview;