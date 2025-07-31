import React from 'react';

const FileCard = ({ title, subject, standard, year, pdfUrl }) => {
  return (
    <div className="file-card">
      <div className="file-card__icon">📄</div>
      <div className="file-card__details">
        <h4>{title}</h4>
        <p>{subject} - {standard} ({year})</p>
      </div>
      <a href={pdfUrl} className="btn btn--primary" target="_blank" rel="noopener noreferrer">
        Download
      </a>
    </div>
  );
};

export default FileCard;