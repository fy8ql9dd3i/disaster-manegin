import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dailynews from "./pages/Dailynews";
import Admindashboard from "./pages/admindashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Navbar at the top */}
        <NavBar />

        {/* Main content area */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dailynews" element={<Dailynews />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
