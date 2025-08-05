import React from 'react';
import { Link } from 'react-router-dom';

const FileCard = ({ title, subject, standard, year, pdfUrl }) => {
  return (
    <div className="file-card">
      <div className="file-card__icon">📄</div>
      <div className="file-card__details">
        <h4>{title}</h4>
        <p>{subject} - {standard} ({year})</p>
      </div>
      <Link to={`/paper-view?pdfUrl=${encodeURIComponent(pdfUrl)}`} className="btn btn--primary">
        View Paper
      </Link>
    </div>
  );
};

export default FileCard;