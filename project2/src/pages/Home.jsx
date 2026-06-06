import React, { useContext } from 'react';
import { Search } from 'lucide-react';
import { BookmarkContext } from '../context/BookmarkContext';
import BookmarkList from '../components/BookmarkList';

const CATEGORIES = ['All', 'Work', 'Study', 'Entertainment', 'News', 'Other'];

const Home = () => {
  const { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter } = useContext(BookmarkContext);

  return (
    <div className="home-page">
      <div className="controls-section">
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search bookmarks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <BookmarkList />
    </div>
  );
};

export default Home;
