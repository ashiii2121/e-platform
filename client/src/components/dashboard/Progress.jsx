import React from 'react';

const Progress = () => {
  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Your Progress</h1>
        <p>Track your learning journey and achievements</p>
      </div>
      <div className="progress-section">
        <div className="progress-card">
          <h3>Overall Progress</h3>
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: '75%' }}></div>
          </div>
          <p>75% Complete</p>
        </div>
        <div className="progress-card">
          <h3>Videos Watched</h3>
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: '60%' }}></div>
          </div>
          <p>12 of 20 videos</p>
        </div>
        <div className="progress-card">
          <h3>Tests Completed</h3>
          <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: '40%' }}></div>
          </div>
          <p>4 of 10 tests</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;