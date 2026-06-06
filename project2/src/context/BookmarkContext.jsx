import React, { createContext, useState, useEffect } from 'react';

export const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addBookmark = (bookmark) => {
    setBookmarks([{ ...bookmark, id: Date.now(), createdAt: new Date().toISOString() }, ...bookmarks]);
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <BookmarkContext.Provider value={{
      bookmarks, addBookmark, deleteBookmark,
      searchTerm, setSearchTerm,
      categoryFilter, setCategoryFilter,
      theme, toggleTheme
    }}>
      {children}
    </BookmarkContext.Provider>
  );
};
