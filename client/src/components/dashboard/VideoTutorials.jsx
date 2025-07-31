import React from 'react';

const VideoTutorials = ({ videos }) => {
  return (
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
                    <path d="M8 5v14l11-7z" fill="currentColor" />
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
  );
};

export default VideoTutorials;