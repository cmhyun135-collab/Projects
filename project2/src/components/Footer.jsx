import React, { useState, useEffect } from 'react';

const Footer = () => {
  const [quote, setQuote] = useState({ text: 'Loading inspiring quote...', author: '' });

  useEffect(() => {
    // Fallback to static quote since free APIs sometimes fail due to CORS/Rate limit
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setQuote({ text: data.content, author: data.author });
      } catch (error) {
        setQuote({ text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' });
      }
    };
    
    fetchQuote();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="quote">"{quote.text}"</p>
        <p className="quote-author">- {quote.author}</p>
        <div className="copyright">
          &copy; {new Date().getFullYear()} MyLinks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
