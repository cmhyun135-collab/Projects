import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="도시명을 입력하세요 (예: Seoul, London)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className="search-button" disabled={isLoading || !input.trim()}>
        {isLoading ? (
          <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }} />
        ) : (
          <Search size={20} />
        )}
      </button>
    </form>
  );
};

export default SearchBar;
