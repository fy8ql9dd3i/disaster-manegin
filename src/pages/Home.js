import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import Contact from "./Contact";
import { AboutPreview } from "./About";
import { TestimonialsPreview } from "./Testimonials";
import Collaboration from "../components/Collaboration";

const Home = () => {
  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Disaster Relief Volunteer System</h1>
        <p>Join us in making a difference when it matters most.</p>

        <div className="hero-buttons">
          <Link to="/contact" className="contact-btn">
            Contact Us
          </Link>
          <Link to="/Signup" className="contact-btn">
            Sign Up
          </Link>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-short">
        <AboutPreview />
        <Link to="/about" className="link-more">
          Click for More →
        </Link>
      </section>

      {/* Contact Form Section */}
      <Contact />

      {/* News Section */}
      <section className="news-section">
        <h2>Daily News</h2>
        <ul>
          <li>Flood relief operation ongoing in Zone A.</li>
          <li>New volunteers registered in Addis Ababa region.</li>
        </ul>
        <Link to="/Dailynews" className="link-more">
          Read More News →
        </Link>
      </section>

      {/* Collaborations Section */}
      <section className="collab-photos">
        <h2>Our Previous Collaborations</h2>
        <Collaboration />
      </section>

      {/* Testimonials Preview Section */}
      <section className="home-testimonials">
        <TestimonialsPreview />
        <Link to="/testimonials" className="link-more">
          Read More Testimonials →
        </Link>
      </section>
    </motion.div>
  );
};

export default Home;
