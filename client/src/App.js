import React from 'react';
import './App.css';
import Me from './Me2.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Me}  alt="Ethan Passino" className="profile-pic" />
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
      </header>
    </div>
  );
}

export default App;
