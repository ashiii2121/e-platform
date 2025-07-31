import React from 'react';
import FileCard from './FileCard';

const ModelTest = ({ modelQuestions }) => {
  return (
    <div className="content-section">
      <div className="section-header">
        <h1>Model Question Papers</h1>
        <p>Test your knowledge with expertly crafted model papers</p>
      </div>
      <div className="file-grid">
        {modelQuestions.map((question) => (
          <FileCard
            key={question._id}
            title={question.title}
            subject={question.subject}
            standard={question.standard}
            year={question.difficulty} // Using difficulty as year for consistency
            pdfUrl={question.pdfUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ModelTest;