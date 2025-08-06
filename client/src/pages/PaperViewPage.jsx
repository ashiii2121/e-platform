import React from 'react';
import { useLocation } from 'react-router-dom';

function PaperViewPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pdfUrl = queryParams.get('pdfUrl');

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'paper.pdf';
      link.click();
    }
  };

  return (
    <div className="paper-view-page">
      <div className="paper-header">
        <div className="header-left">
          <button onClick={() => window.history.back()} className="btn-primary">
            Back
          </button>
        </div>
        <div className="header-right">
          <button onClick={handleDownload} className="btn-primary">
            Download PDF
          </button>
        </div>
      </div>
      <div className="paper-viewer">
        {pdfUrl ? (
          <iframe src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/${pdfUrl}`} title="Paper Viewer" width="100%" height="100%" />
        ) : (
          <div className="error-container">
            <h2>No PDF to display</h2>
            <p>The PDF URL is missing.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaperViewPage;
