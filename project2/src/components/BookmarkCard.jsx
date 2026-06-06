import React, { useContext } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { BookmarkContext } from '../context/BookmarkContext';

const BookmarkCard = ({ bookmark }) => {
  const { deleteBookmark } = useContext(BookmarkContext);

  const formattedDate = new Date(bookmark.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bookmark-card">
      <div className="card-header">
        <h3 className="card-title">{bookmark.title}</h3>
        {bookmark.category && <span className="card-category">{bookmark.category}</span>}
      </div>
      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="card-url">
        {bookmark.url} <ExternalLink size={14} className="inline-icon" />
      </a>
      <p className="card-memo">{bookmark.memo}</p>
      <div className="card-footer">
        <span className="card-date">{formattedDate}</span>
        <button 
          onClick={() => deleteBookmark(bookmark.id)} 
          className="delete-btn"
          aria-label="Delete bookmark"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default BookmarkCard;
