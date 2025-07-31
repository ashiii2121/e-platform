
import React from 'react';

const DashboardStats = ({ videos, previousQuestions, modelQuestions }) => {
  return (
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
  );
};

export default DashboardStats;
