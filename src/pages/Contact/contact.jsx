import React from "react";
import "../Blog/pages.css";

const Contact = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>

      <p className="intro">
        Have questions, feedback, or partnership ideas?  
        We’d love to hear from you.
      </p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5"></textarea>

        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <p><strong>Email:</strong> support@contesthub.com</p>
        <p><strong>Location:</strong> Worldwide 🌍</p>
      </div>
    </div>
  );
};

export default Contact;
