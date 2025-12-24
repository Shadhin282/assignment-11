import React from "react";
import "./pages.css";

const About = () => {
  return (
    <div className="page-container">
      <h1>About ContestHub</h1>

      <p className="intro">
        ContestHub is a creative platform where designers, developers, and
        innovators compete, showcase their skills, and win exciting prizes.
      </p>

      <section className="section">
        <h2>🎯 Our Mission</h2>
        <p>
          Our mission is to empower creative minds by providing fair, transparent,
          and rewarding competitions that help individuals grow and get noticed.
        </p>
      </section>

      <section className="section">
        <h2>🏆 Why ContestHub?</h2>
        <ul>
          <li>Real contests with real rewards</li>
          <li>Open to designers, developers & creatives</li>
          <li>Transparent judging process</li>
          <li>Community-driven innovation</li>
        </ul>
      </section>

      <section className="section">
        <h2>📝 Blog & Updates</h2>
        <p>
          Stay tuned for contest tips, winner stories, design trends, and platform
          updates through our upcoming blog section.
        </p>
      </section>
    </div>
  );
};

export default About;
