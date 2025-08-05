import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { examPapersAPI, handleApiError } from "../services/api";
import AnimatedButton from "../components/AnimatedButton";
import AnimatedLoader from "../components/AnimatedLoader";
import "./PaperViewPage.css";
import {
  FaArrowLeft,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaClock,
  FaFileAlt,
  FaGraduationCap,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

function PaperViewPage() {
  const { subjectId, paperId } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const headerRef = useRef(null);
  const viewerRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    loadPaper();
  }, [paperId]);

  useEffect(() => {
    if (!loading && paper) {
      // GSAP animations
      const tl = gsap.timeline();

      tl.fromTo(headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(controlsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(viewerRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, [loading, paper]);

  const loadPaper = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API
      const response = await examPapersAPI.getPaper(paperId);
      setPaper(response.data);
      setTotalPages(response.data.totalPages || 10); // Mock data
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Simulate download
      const link = document.createElement('a');
      link.href = paper.downloadUrl || '#';
      link.download = `${paper.title}.pdf`;
      link.click();
    } catch (err) {
      alert('Download failed. Please try again.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(prev => prev + 25);
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(prev => prev - 25);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="paper-view-page">
        <div className="loading-container">
          <AnimatedLoader 
            size="large" 
            color="primary" 
            text="Loading paper..." 
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="paper-view-page">
        <div className="error-container">
          <h2>Paper Not Found</h2>
          <p>{error}</p>
          <Link to={`/subject/${subjectId}`} className="btn-primary">
            Back to Subject
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`paper-view-page ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Header */}
      <div className="paper-header" ref={headerRef}>
        <div className="header-left">
          <AnimatedButton
            variant="ghost"
            size="medium"
            animation="lift"
            onClick={() => navigate(`/subject/${subjectId}`)}
            className="back-button"
          >
            <FaArrowLeft />
            <span className="button-text">Back to Subject</span>
          </AnimatedButton>
          
          <div className="breadcrumb">
            <Link to="/dashboard">Dashboard</Link>
            <span>›</span>
            <Link to={`/subject/${subjectId}`}>Subject</Link>
            <span>›</span>
            <span>{paper?.title}</span>
          </div>
        </div>

        <div className="header-right">
          <AnimatedButton
            variant="primary"
            size="medium"
            animation="ripple"
            onClick={handleDownload}
            className="download-button"
          >
            <FaDownload />
            <span className="button-text">Download PDF</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Paper Info */}
      <div className="paper-info-bar">
        <div className="paper-details">
          <h1 className="paper-title">{paper?.title}</h1>
          <div className="paper-meta">
            <span className="meta-item">
              <FaCalendarAlt />
              <span className="meta-text">{paper?.year}</span>
            </span>
            <span className="meta-item">
              <FaClock />
              <span className="meta-text">{paper?.duration || '3 hours'}</span>
            </span>
            <span className="meta-item">
              <FaFileAlt />
              <span className="meta-text">{paper?.type || 'Question Paper'}</span>
            </span>
            <span className="meta-item">
              <FaGraduationCap />
              <span className="meta-text">{paper?.difficulty || 'Standard'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Viewer Controls */}
      <div className="viewer-controls" ref={controlsRef}>
        <div className="controls-left">
          <button 
            className="control-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            className="control-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="controls-center">
          <button 
            className="control-btn"
            onClick={() => handleZoom('out')}
            disabled={zoomLevel <= 50}
          >
            -
          </button>
          
          <span className="zoom-info">{zoomLevel}%</span>
          
          <button 
            className="control-btn"
            onClick={() => handleZoom('in')}
            disabled={zoomLevel >= 200}
          >
            +
          </button>
        </div>

        <div className="controls-right">
          <button 
            className="control-btn"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {/* Paper Viewer */}
      <div className="paper-viewer" ref={viewerRef}>
        <div 
          className="paper-content"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          {/* Mock paper content - replace with actual PDF viewer */}
          <div className="paper-page">
            <div className="paper-page-header">
              <h2>Kerala Higher Secondary Examination</h2>
              <h3>{paper?.subject} - {paper?.year}</h3>
              <p>Time: {paper?.duration || '3 hours'} &nbsp;&nbsp;&nbsp; Maximum Marks: {paper?.maxMarks || '80'}</p>
            </div>
            
            <div className="paper-instructions">
              <h4>Instructions:</h4>
              <ul>
                <li>Read all questions carefully before answering.</li>
                <li>Answer all questions in the answer booklet provided.</li>
                <li>Use blue or black ink pen only.</li>
                <li>Calculators are not allowed unless specified.</li>
              </ul>
            </div>

            <div className="paper-questions">
              <div className="question-section">
                <h4>PART A - Multiple Choice Questions (1 mark each)</h4>
                <p>Choose the correct answer from the options given below:</p>
                
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="question">
                    <p><strong>{num}.</strong> This is a sample question for demonstration purposes. What is the correct answer?</p>
                    <div className="options">
                      <p>(a) Option A</p>
                      <p>(b) Option B</p>
                      <p>(c) Option C</p>
                      <p>(d) Option D</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="question-section">
                <h4>PART B - Short Answer Questions (2 marks each)</h4>
                
                {[6, 7, 8, 9, 10].map(num => (
                  <div key={num} className="question">
                    <p><strong>{num}.</strong> This is a sample short answer question for demonstration purposes.</p>
                  </div>
                ))}
              </div>

              <div className="question-section">
                <h4>PART C - Long Answer Questions (5 marks each)</h4>
                
                {[11, 12, 13].map(num => (
                  <div key={num} className="question">
                    <p><strong>{num}.</strong> This is a sample long answer question for demonstration purposes. Explain in detail with examples.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaperViewPage;
