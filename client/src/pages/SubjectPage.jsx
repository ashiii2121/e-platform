import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subjectsAPI, examPapersAPI, handleApiError } from "../services/api";
import { keralaHSESubjects, generateExamPapers } from "../data/keralaHSEData";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedButton from "../components/AnimatedButton";
import AnimatedLoader from "../components/AnimatedLoader";
import "./SubjectPage.css";

gsap.registerPlugin(ScrollTrigger);

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [examPapers, setExamPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const papersRef = useRef(null);

  useEffect(() => {
    const loadSubjectData = async () => {
      try {
        setLoading(true);

        // Try to load subject from API first
        let foundSubject = null;
        try {
          const response = await subjectsAPI.getById(subjectId);
          foundSubject = response.data;
        } catch (apiError) {
          console.warn(
            "Subject API not available, using static data:",
            handleApiError(apiError)
          );

          // Fallback to static data
          Object.entries(keralaHSESubjects).forEach(([classKey, classData]) => {
            const subjectFound = classData.subjects.find(
              (s) => s.id === subjectId
            );
            if (subjectFound) {
              foundSubject = { ...subjectFound, className: classData.name };
            }
          });
        }

        if (foundSubject) {
          setSubject(foundSubject);

          // Try to load exam papers from API
          try {
            const papersResponse = await examPapersAPI.getBySubject(subjectId);
            setExamPapers(papersResponse.data.papers);
            setFilteredPapers(papersResponse.data.papers);
          } catch (apiError) {
            console.warn(
              "Papers API not available, using generated data:",
              handleApiError(apiError)
            );

            // Fallback to generated papers
            const papers = generateExamPapers(
              foundSubject.id,
              foundSubject.name,
              foundSubject.className
            );
            setExamPapers(papers);
            setFilteredPapers(papers);
          }
        }
      } catch (err) {
        console.error("Error loading subject data:", handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadSubjectData();
  }, [subjectId]);

  // GSAP animations
  useEffect(() => {
    if (loading || !subject) return;

    const tl = gsap.timeline();

    // Animate header
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      // Animate filters
      .fromTo(
        filtersRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

    // Animate papers with scroll trigger
    if (papersRef.current) {
      gsap.fromTo(
        papersRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: papersRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [loading, subject]);

  useEffect(() => {
    let filtered = examPapers;

    // Filter by year
    if (selectedYear !== "all") {
      filtered = filtered.filter((paper) => paper.year === selectedYear);
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (paper) => paper.difficulty.toLowerCase() === selectedDifficulty
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (paper) =>
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.year.includes(searchTerm) ||
          paper.topics.some((topic) =>
            topic.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredPapers(filtered);
  }, [examPapers, selectedYear, selectedDifficulty, searchTerm]);

  const getYearOptions = () => {
    const years = [...new Set(examPapers.map((paper) => paper.year))];
    return years.sort((a, b) => b - a);
  };

  const handleDownload = async (paper) => {
    if (!paper.isAvailable) {
      alert("This paper is not available for download yet.");
      return;
    }

    try {
      // Try to use API for download tracking
      try {
        const response = await examPapersAPI.download(paper.id);

        // Open the download URL
        window.open(response.data.downloadUrl, "_blank");

        alert(`Downloading ${paper.title}... Download started!`);
      } catch (apiError) {
        console.warn("Download API not available:", handleApiError(apiError));

        // Fallback to direct download
        if (paper.downloadUrl && paper.downloadUrl !== "#") {
          window.open(paper.downloadUrl, "_blank");
          alert(`Downloading ${paper.title}...`);
        } else {
          alert("Download link not available. This is a demo version.");
        }
      }
    } catch (err) {
      console.error("Download error:", handleApiError(err));
      alert("Error initiating download. Please try again.");
    }
  };

  const handlePreview = (paper) => {
    navigate(`/subject/${subjectId}/paper/${paper.id}`);
  };

  if (loading) {
    return (
      <div className="subject-page">
        <div className="loading-container">
          <AnimatedLoader
            size="large"
            color="primary"
            text="Loading exam papers..."
          />
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="subject-page">
        <div className="error-container">
          <h2>Subject Not Found</h2>
          <p>The requested subject could not be found.</p>
          <Link to="/dashboard" className="btn-primary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="subject-page">
      {/* Header */}
      <div className="subject-header" ref={headerRef}>
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link>
          <span>›</span>
          <span>{subject.className}</span>
          <span>›</span>
          <span>{subject.name}</span>
        </div>

        <div className="subject-info">
          <div className="subject-icon-large">{subject.icon}</div>
          <div className="subject-details">
            <h1>{subject.name}</h1>
            <p className="subject-class">{subject.className}</p>
            <p className="subject-description">{subject.description}</p>
          </div>
        </div>

        <div className="subject-stats">
          <div className="stat-item">
            <span className="stat-number">{examPapers.length}</span>
            <span className="stat-label">Total Papers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {examPapers.filter((p) => p.isAvailable).length}
            </span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">26</span>
            <span className="stat-label">Years</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section" ref={filtersRef}>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="dropdown-filters">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Years</option>
            {getYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="papers-section">
        <div className="section-header">
          <h2>Exam Papers ({filteredPapers.length})</h2>
          <div className="view-options">
            <button className="view-btn active">Grid</button>
            <button className="view-btn">List</button>
          </div>
        </div>

        {filteredPapers.length === 0 ? (
          <div className="no-papers">
            <span className="no-papers-icon">📄</span>
            <h3>No papers found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="papers-grid" ref={papersRef}>
            {filteredPapers.map((paper, index) => (
              <AnimatedCard
                key={paper.id}
                className={`paper-card ${
                  !paper.isAvailable ? "unavailable" : ""
                }`}
                hoverEffect="lift"
                glowColor="#e0284a"
                delay={index * 0.1}
              >
                <div className="paper-header">
                  <div className="paper-year">{paper.year}</div>
                  <div
                    className={`difficulty-badge ${paper.difficulty.toLowerCase()}`}
                  >
                    {paper.difficulty}
                  </div>
                </div>

                <div className="paper-content">
                  <h3 className="paper-title">{paper.title}</h3>
                  <p className="paper-type">
                    {paper.type} - {paper.month}
                  </p>

                  <div className="paper-details">
                    <span className="detail-item">📄 {paper.pages} pages</span>
                    <span className="detail-item">💾 {paper.fileSize}</span>
                  </div>

                  <div className="paper-topics">
                    {paper.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="topic-tag">
                        {topic}
                      </span>
                    ))}
                    {paper.topics.length > 3 && (
                      <span className="topic-tag more">
                        +{paper.topics.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="paper-actions">
                  <AnimatedButton
                    variant={paper.isAvailable ? "primary" : "outline"}
                    size="medium"
                    animation="ripple"
                    disabled={!paper.isAvailable}
                    onClick={() => handleDownload(paper)}
                    className="btn-download"
                  >
                    {paper.isAvailable ? "⬇️ Download PDF" : "🔒 Not Available"}
                  </AnimatedButton>
                  <AnimatedButton
                    variant="ghost"
                    size="medium"
                    animation="glow"
                    onClick={() => handlePreview(paper)}
                    className="btn-preview"
                  >
                    👁️ Preview
                  </AnimatedButton>
                </div>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>

      {/* Download All Section */}
      <div className="download-all-section">
        <div className="download-all-card">
          <h3>Download All Available Papers</h3>
          <p>
            Get all {examPapers.filter((p) => p.isAvailable).length} available
            papers for {subject.name} in a single ZIP file
          </p>
          <button className="btn-download-all">
            📦 Download All (
            {(examPapers.filter((p) => p.isAvailable).length * 2.5).toFixed(1)}{" "}
            MB)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
