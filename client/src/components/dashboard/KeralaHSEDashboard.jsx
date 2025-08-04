import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { subjectsAPI, examPapersAPI, handleApiError } from "../../services/api";
import { keralaHSESubjects } from "../../data/keralaHSEData";
import "./KeralaHSEDashboard.css";

gsap.registerPlugin(ScrollTrigger);

const KeralaHSEDashboard = () => {
  const [selectedClass, setSelectedClass] = useState("class10");
  const [searchTerm, setSearchTerm] = useState("");
  const [subjects, setSubjects] = useState(keralaHSESubjects);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dashboardRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const statsRef = useRef(null);
  const subjectsRef = useRef(null);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Try to load subjects from API, fallback to static data
        try {
          const subjectsResponse = await subjectsAPI.getAll();
          setSubjects(subjectsResponse.data);
        } catch (apiError) {
          console.warn(
            "API not available, using static data:",
            handleApiError(apiError)
          );
          setSubjects(keralaHSESubjects);
        }

        // Try to load stats from API
        try {
          const statsResponse = await examPapersAPI.getStats();
          setStats(statsResponse.data);
        } catch (apiError) {
          console.warn("Stats API not available:", handleApiError(apiError));
        }
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (loading) return;

    const tl = gsap.timeline();

    // Animate header
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      // Animate tabs
      .fromTo(
        tabsRef.current?.children || [],
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.5"
      )
      // Animate stats
      .fromTo(
        statsRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    // Animate subject cards with scroll trigger
    if (subjectsRef.current) {
      gsap.fromTo(
        subjectsRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subjectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Floating animation for subject cards
    gsap.to(".subject-card", {
      y: -5,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1,
        from: "random",
      },
    });
  }, [loading]);

  // Animate class change
  useEffect(() => {
    if (subjectsRef.current) {
      gsap.fromTo(
        subjectsRef.current.children,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [selectedClass]);

  const filteredSubjects =
    subjects[selectedClass]?.subjects?.filter(
      (subject) =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const getClassStats = (classKey) => {
    const subjects = keralaHSESubjects[classKey].subjects;
    return {
      totalSubjects: subjects.length,
      totalPapers: subjects.length * 26, // 26 years (2000-2025)
      availablePapers: subjects.length * 11, // 11 years (2015-2025)
    };
  };

  return (
    <div className="kerala-hse-dashboard" ref={dashboardRef}>
      {/* Header Section */}
      <div className="dashboard-header" ref={headerRef}>
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="kerala-flag">🏛️</span>
            Kerala HSE Previous Papers
          </h1>
          <p className="dashboard-subtitle">
            Access previous year question papers from 2000-2025 for all Kerala
            HSE subjects
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Class Selection Tabs */}
      <div className="class-tabs" ref={tabsRef}>
        {Object.entries(keralaHSESubjects).map(([key, classData]) => {
          const stats = getClassStats(key);
          return (
            <button
              key={key}
              className={`class-tab ${selectedClass === key ? "active" : ""}`}
              onClick={() => setSelectedClass(key)}
            >
              <div className="tab-content">
                <h3>{classData.name}</h3>
                <div className="tab-stats">
                  <span>{stats.totalSubjects} Subjects</span>
                  <span>{stats.availablePapers} Papers</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="stats-overview" ref={statsRef}>
        {(() => {
          const stats = getClassStats(selectedClass);
          return (
            <>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3>{stats.totalSubjects}</h3>
                  <p>Total Subjects</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div className="stat-content">
                  <h3>{stats.totalPapers}</h3>
                  <p>Total Papers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{stats.availablePapers}</h3>
                  <p>Available Papers</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>26</h3>
                  <p>Years Covered</p>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Subjects Grid */}
      <div className="subjects-section">
        <h2 className="section-title">
          {keralaHSESubjects[selectedClass].name} Subjects
        </h2>

        {filteredSubjects.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No subjects found</h3>
            <p>Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="subjects-grid" ref={subjectsRef}>
            {filteredSubjects.map((subject) => (
              <div key={subject.id} className="subject-card">
                <div className="subject-header">
                  <div className="subject-icon">{subject.icon}</div>
                  <div className="subject-info">
                    <h3 className="subject-name">{subject.name}</h3>
                    <span className="subject-code">{subject.code}</span>
                  </div>
                </div>

                <p className="subject-description">{subject.description}</p>

                <div className="subject-stats">
                  <div className="stat-item">
                    <span className="stat-label">Papers Available:</span>
                    <span className="stat-value">26 Years</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Latest:</span>
                    <span className="stat-value">2025</span>
                  </div>
                </div>

                <div className="subject-actions">
                  <button
                    className="btn-primary"
                    onClick={() =>
                      (window.location.href = `/subject/${subject.id}`)
                    }
                  >
                    View Papers
                  </button>
                  <button className="btn-secondary">Quick Download</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Sources */}
      <div className="sources-section">
        <h2 className="section-title">Official Sources</h2>
        <div className="sources-grid">
          <div className="source-card">
            <h4>Kerala DHSE Portal</h4>
            <p>Official Kerala Directorate of Higher Secondary Education</p>
            <a
              href="https://dhsekerala.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Visit Site →
            </a>
          </div>
          <div className="source-card">
            <h4>Education Observer</h4>
            <p>Comprehensive collection of Kerala HSE papers</p>
            <a
              href="https://educationobserver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Visit Site →
            </a>
          </div>
          <div className="source-card">
            <h4>HSS Live</h4>
            <p>Kerala Higher Secondary education portal</p>
            <a
              href="https://hsslive.in"
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              Visit Site →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeralaHSEDashboard;
