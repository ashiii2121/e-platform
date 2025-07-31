import React from 'react';
import FileCard from './FileCard';

const PreviousPapers = ({ previousQuestions }) => {
  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Previous Year Questions</h1>
        <p>Practice with real exam papers from previous years</p>
      </div>
      <div className="file-grid">
        {previousQuestions.map((question) => (
          <FileCard
            key={question._id}
            title={question.title}
            subject={question.subject}
            standard={question.standard}
            year={question.year}
            pdfUrl={question.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousPapers;