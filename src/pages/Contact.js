import React, { useState, useEffect } from "react";
import "./Contact.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    latitude: "",
    longitude: "",
  });

  const [imagePreview, setImagePreview] = useState(null); // live preview
  const [locationLoaded, setLocationLoaded] = useState(false);

  // Auto GPS coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }));
          setLocationLoaded(true);
        },
        () => alert("Unable to get your location")
      );
    }
  }, []);

  // Handle image selection and live preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // live preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form data to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!locationLoaded) {
      alert("GPS not ready yet. Please wait...");
      return;
    }

    const messages = JSON.parse(localStorage.getItem("messages")) || [];
    const newMessage = {
      ...formData,
      image: imagePreview,
      id: Date.now(),
    };
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("✅ Message submitted successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      latitude: "",
      longitude: "",
    });
    setImagePreview(null);
    setLocationLoaded(false);
  };

  return (
    <div className="contact-container">
      <h2>📩 Contact Us</h2>
      <p>
        If there’s an emergency or you’ve witnessed a disaster, submit here.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        />

        {/* Image upload */}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* Live image preview */}
        {imagePreview && (
          <div className="preview-image">
            <p>Live Preview:</p>
            <img src={imagePreview} alt="Live Preview" />
          </div>
        )}

        <button type="submit">Send Message</button>
      </form>

      {locationLoaded ? (
        <p className="location-info">
          📍 Location captured: <br />
          Latitude: {formData.latitude} <br />
          Longitude: {formData.longitude}
        </p>
      ) : (
        <p className="location-info">📡 Getting your location...</p>
      )}
    </div>
  );
}

export default ContactPage;
