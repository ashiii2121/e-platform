import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import Sidebar from "../components/dashboard/Sidebar";
import Overview from "../components/dashboard/Overview";
import VideoTutorials from "../components/dashboard/VideoTutorials";
import PreviousPapers from "../components/dashboard/PreviousPapers";
import ModelTest from "../components/dashboard/ModelTest";
import Progress from "../components/dashboard/Progress";
import KeralaHSEDashboard from "../components/dashboard/KeralaHSEDashboard";

function DashboardPage() {
  const [videos, setVideos] = useState([]);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [modelQuestions, setModelQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("kerala-hse");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Mock data for demonstration
  const mockVideos = [
    {
      _id: "1",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      duration: "45 min",
      thumbnail:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&w=400&q=80",
      url: "https://www.youtube.com/watch?v=example1",
      description:
        "Master the basics of algebra with step-by-step explanations",
    },
    {
      _id: "2",
      title: "Organic Chemistry Basics",
      subject: "Chemistry",
      duration: "60 min",
      thumbnail:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&w=400&q=80",
      url: "https://www.youtube.com/watch?v=example2",
      description: "Introduction to organic compounds and reactions",
    },
    {
      _id: "3",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      duration: "50 min",
      thumbnail:
        "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&w=400&q=80",
      url: "https://www.youtube.com/watch?v=example3",
      description: "Understanding the fundamental laws of motion",
    },
    {
      _id: "4",
      title: "Cell Biology",
      subject: "Biology",
      duration: "55 min",
      thumbnail:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&w=400&q=80",
      url: "https://www.youtube.com/watch?v=example4",
      description: "Explore the structure and function of cells",
    },
  ];

  const mockPreviousQuestions = [
    {
      _id: "1",
      title: "Mathematics Board Exam 2023",
      subject: "Mathematics",
      standard: "Class 12",
      year: "2023",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      _id: "2",
      title: "Physics Board Exam 2023",
      subject: "Physics",
      standard: "Class 12",
      year: "2023",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      _id: "3",
      title: "Chemistry Board Exam 2022",
      subject: "Chemistry",
      standard: "Class 11",
      year: "2022",
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const mockModelQuestions = [
    {
      _id: "1",
      title: "Mathematics Model Paper - Set A",
      subject: "Mathematics",
      standard: "Class 12",
      difficulty: "Medium",
      pdfUrl: "#",
    },
    {
      _id: "2",
      title: "Physics Practice Test - Set B",
      subject: "Physics",
      standard: "Class 11",
      difficulty: "Hard",
      pdfUrl: "#",
    },
    {
      _id: "3",
      title: "Chemistry Mock Exam - Set C",
      subject: "Chemistry",
      standard: "Class 10",
      difficulty: "Easy",
      pdfUrl: "#",
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setVideos(mockVideos);
      setPreviousQuestions(mockPreviousQuestions);
      setModelQuestions(mockModelQuestions);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="hamburger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="dashboard__main-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      <main className="dashboard__main">
        <div className="dashboard__content">
          {activeSection === "kerala-hse" && <KeralaHSEDashboard />}
          {activeSection === "overview" && (
            <Overview
              videos={videos}
              previousQuestions={previousQuestions}
              modelQuestions={modelQuestions}
              setActiveSection={setActiveSection}
            />
          )}
          {activeSection === "videos" && <VideoTutorials videos={videos} />}
          {activeSection === "previous-papers" && (
            <PreviousPapers previousQuestions={previousQuestions} />
          )}
          {activeSection === "model-tests" && (
            <ModelTest modelQuestions={modelQuestions} />
          )}
          {activeSection === "progress" && <Progress />}
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
