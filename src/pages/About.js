import React from "react";
import "./About.css";

/* ✅ Short About Preview – shown on Home page */
export const AboutPreview = () => (
  <div className="about-preview">
    <h2>About Us</h2>
    <p>
      Our Disaster Relief Volunteer System connects communities, volunteers, and
      coordinators to act quickly when emergencies strike. We use technology to
      streamline communication, organize rescue missions, and deliver essential
      aid to affected areas in real time. Together, we ensure that no call for
      help goes unanswered and every volunteer effort counts where it matters
      most.
    </p>
  </div>
);

/* ✅ Full About Page */
const About = () => (
  <div className="about-page">
    <h1>About Our Organization</h1>
    <p>
      The <strong>Disaster Relief Volunteer System (DRVS)</strong> was created
      with one clear goal — to connect people who want to help with communities
      that desperately need it during times of crisis. Our platform empowers
      citizens, trained volunteers, and emergency response teams to communicate,
      coordinate, and respond efficiently when disasters strike.
    </p>

    <h2>Our Mission</h2>
    <p>
      Our mission is to provide a fast, reliable, and technology-driven
      communication channel between volunteers, coordinators, and affected
      areas. We believe that every second counts during disasters — and that
      effective coordination can save lives. By simplifying how help is offered,
      requested, and delivered, DRVS ensures that no one is left behind.
    </p>

    <h2>Our Vision</h2>
    <p>
      We envision a world where disaster response is immediate, transparent, and
      collaborative. We aim to build a connected network of volunteers and
      organizations capable of responding to emergencies within minutes,
      reducing the human and economic impact of natural and man-made disasters.
    </p>

    <h2>How It Works</h2>
    <p>
      When a disaster occurs, coordinators post alerts and tasks through the
      system. Volunteers registered in nearby regions receive notifications and
      can accept missions such as distributing supplies, providing first aid, or
      helping in rescue operations. Administrators oversee progress in real time
      through the dashboard, ensuring that aid is delivered to the right people
      at the right time.
    </p>

    <h2>Our Core Features</h2>
    <ul>
      <li>📍 Real-time disaster alerts and volunteer coordination</li>
      <li>🤝 Centralized communication between responders and coordinators</li>
      <li>🗺️ Location-based task assignment and progress tracking</li>
      <li>📦 Resource and donation management tools</li>
      <li>💬 Instant updates for affected communities</li>
    </ul>

    <h2>Why It Matters</h2>
    <p>
      Many lives are lost not because of the disaster itself, but due to delayed
      or uncoordinated response efforts. Our platform bridges that gap by making
      information accessible instantly. Whether it’s a flood, earthquake, fire,
      or any other emergency, DRVS enables communities to respond faster and
      smarter — reducing panic, saving time, and saving lives.
    </p>

    <h2>Our Impact</h2>
    <p>
      Since its creation, the system has connected hundreds of volunteers with
      response teams in multiple regions. Local authorities and community
      organizations have adopted it to coordinate efforts during flood and
      drought emergencies. It has become a model for digital volunteerism and
      community-based resilience.
    </p>

    <h2>Join Us</h2>
    <p>
      You don’t have to be a professional rescuer to make a difference. Anyone
      can help — whether through sharing information, distributing supplies, or
      offering technical skills. By joining DRVS, you become part of a network
      of compassionate individuals working together to make disaster response
      faster, smarter, and more human.
    </p>
  </div>
);

export default About;
