import React from 'react';
import '../styles/Home.css'; 
import heroImg from '../assets/resort-hero.png';

const Home = () => {
  return (
    <div className="home-page">
      <div className="top-nav">
        <span>Ende Bete</span>
        <span>Kuriftu African Village</span>
        <div className="user-badge">Selam ❤️</div>
      </div>

      <section className="hero-banner">
        <img src={heroImg} alt="Hero" className="hero-img" />
        
        <div className="hero-text">
          <h1 className='hero-txt'>Good afternoon, Selam</h1>
          <p>You are family here</p>
        </div>
      </section>

      <div className="weather-widgets">
        <div className="widget">
          <span role="img" aria-label="sun">☀️</span> Now: 24°C, Sunny
        </div>
        <div className="widget">
          <span role="img" aria-label="sunset">🌇</span> Sunset in: 3 hours 45 minutes
        </div>
      </div>

      <section className="noticed-section">
        <h2>We noticed...</h2>
        <div className="suggestion-card">
          <div className="card-info">
            <h3>Cold Hibiscus Tea + Foot Massage</h3>
            <p>We noticed your long journey and the warm weather. Would you like a refreshing cold hibiscus tea followed by a 15-minute traditional foot massage?</p>
          </div>
          <span className="suggested-time">Suggested: 5:00 PM</span>
        </div>
      </section>
    </div>
  );
};

export default Home;