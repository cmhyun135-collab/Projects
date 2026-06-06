import React, { useContext } from 'react';
import { BookmarkContext } from '../context/BookmarkContext';
import BookmarkCard from './BookmarkCard';

const BookmarkList = () => {
  const { bookmarks, searchTerm, categoryFilter } = useContext(BookmarkContext);

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bookmark.memo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || bookmark.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p>No bookmarks yet. Add your first link!</p>
      </div>
    );
  }

  if (filteredBookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p>No bookmarks match your search/filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="bookmark-grid">
      {filteredBookmarks.map(bookmark => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};

export default BookmarkList;
