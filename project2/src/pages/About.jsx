import React from 'react';

const About = () => {
  return (
    <div className="page-container">
      <div className="about-content">
        <h2>About MyLinks</h2>
        <p>
          MyLinks is a modern, personalized bookmark manager built to help you organize your digital life. 
          Save your favorite websites, categorize them for easy access, and add memos so you never forget why you saved a link.
        </p>
        
        <h3>Features</h3>
        <ul>
          <li><strong>Local Storage:</strong> Your data is saved securely in your browser.</li>
          <li><strong>Dark Mode:</strong> Easy on the eyes, toggle between light and dark themes.</li>
          <li><strong>Smart Filtering:</strong> Instantly find what you need by searching or filtering by category.</li>
        </ul>

        <div className="about-footer">
          <p>Built with React & Vite.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
