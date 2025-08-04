import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 12h16M8 16h16M8 20h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="header__logo-text">EduWeb</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link
                to="/"
                className={`header__nav-link ${isActiveLink('/') ? 'header__nav-link--active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/videos"
                className={`header__nav-link ${isActiveLink('/videos') ? 'header__nav-link--active' : ''}`}
              >
                Video Tutorials
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/dashboard"
                className={`header__nav-link ${isActiveLink('/dashboard') ? 'header__nav-link--active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="header__nav-item">
              <Link
                to="/pricing"
                className={`header__nav-link ${isActiveLink('/pricing') ? 'header__nav-link--active' : ''}`}
              >
                Pricing
              </Link>
            </li>
          </ul>
        </nav>

        {/* Auth Buttons */}
        <div className="header__auth">
          <Link to="/login" className="header__auth-link">
            Login
          </Link>
          <Link to="/signup" className="header__auth-btn">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
          <ul className="header__mobile-nav-list">
            <li className="header__mobile-nav-item">
              <Link
                to="/"
                className={`header__mobile-nav-link ${isActiveLink('/') ? 'header__mobile-nav-link--active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/dashboard"
                className={`header__mobile-nav-link ${isActiveLink('/dashboard') ? 'header__mobile-nav-link--active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/pricing"
                className={`header__mobile-nav-link ${isActiveLink('/pricing') ? 'header__mobile-nav-link--active' : ''}`}
              >
                Pricing
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/login"
                className="header__mobile-nav-link"
              >
                Login
              </Link>
            </li>
            <li className="header__mobile-nav-item">
              <Link
                to="/signup"
                className="header__mobile-nav-link header__mobile-nav-link--primary"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="header__overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

export default Header;