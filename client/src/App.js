import React, { useState, useEffect } from 'react';
import './App.css';
import Me from './Me2.png';

function App() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    // Fetch the page view count from the backend
    const fetchViews = async () => {
      try {
        let response = await fetch('/api/views');
        let data = await response.json();
        setViews(data.count);
      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    fetchViews();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={Me} alt="Ethan Passino" className="profile-pic" />
        <h1>Hello, I'm Ethan Passino</h1>
        <p>I’m a college student, passionate about becoming a Software Engineer. Welcome to my personal page where you can learn more about me! This page was created using React, Node.js, and Express.</p>

        <div className="links">
          <a href="https://github.com/Ethan-Passino" target="_blank" rel="noopener noreferrer" className="button">Visit My GitHub</a>
          <a href="https://discord.gg/0deI7V0QFPpXLQJW" target="_blank" rel="noopener noreferrer" className="button">Join My Discord Server</a>
          <a href="mailto:itzethanpassino@gmail.com" className="button">Contact Me</a>
        </div>

        <div className="contact-info">
          <p>Discord: technicium</p>
          <p>Email: <a href="mailto:itzethanpassino@gmail.com">itzethanpassino@gmail.com</a></p>
        </div>

        {/* View Counter */}
        <div className="view-counter">
          <span role="img" aria-label="eye">👁️</span>
          <p className="view-count">Page Views: {views}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
