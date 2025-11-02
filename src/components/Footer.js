import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>
          Connecting volunteers and coordinators to deliver rapid, organized
          responses during disasters.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/about" className="footer-link">
          About Us
        </Link>
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
        <Link to="/testimonials" className="footer-link">
          Testimonials
        </Link>
        <Link to="/dailynews" className="footer-link">
          Daily News
        </Link>
        <Link to="/signup" className="footer-link signup-link">
          Sign Up
        </Link>
        <Link to="/login" className="footer-link login-link">
          Login
        </Link>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Disaster Relief Volunteer System.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
