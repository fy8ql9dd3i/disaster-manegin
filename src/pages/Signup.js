import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Name:", e.target.fullName.value);
    console.log("Email:", e.target.email.value);
    console.log("Password:", e.target.password.value);
    console.log("Uploaded ID:", photo);
    alert("Form submitted! Check console for details.");
  };

  return (
    <div className="page">
      <h1>Sign Up as a Volunteer</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        {/* Upload ID styled like other inputs */}
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
          className="file-input"
        />

        {/* Preview the uploaded photo */}
        {photo && (
          <div className="preview">
            <p>Preview:</p>
            <img src={URL.createObjectURL(photo)} alt="Preview" />
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
