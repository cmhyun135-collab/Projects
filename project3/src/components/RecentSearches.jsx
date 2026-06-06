import React from 'react';

const RecentSearches = ({ searches, onSelect }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className="recent-searches">
      <div className="recent-title">최근 검색</div>
      <div className="recent-tags">
        {searches.map((city, index) => (
          <button
            key={`${city}-${index}`}
            className="recent-tag"
            onClick={() => onSelect(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
