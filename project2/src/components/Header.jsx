import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Sun, Moon } from 'lucide-react';
import { BookmarkContext } from '../context/BookmarkContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(BookmarkContext);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Bookmark className="logo-icon" />
          <span>MyLinks</span>
        </Link>
        <nav className="nav">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>Add</Link>
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
