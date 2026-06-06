import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookmarkContext } from '../context/BookmarkContext';

const CATEGORIES = ['Work', 'Study', 'Entertainment', 'News', 'Other'];

const BookmarkForm = () => {
  const { addBookmark } = useContext(BookmarkContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    memo: '',
    category: 'Work'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let finalUrl = formData.url;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    addBookmark({ ...formData, url: finalUrl });
    navigate('/'); 
  };

  return (
    <div className="form-container">
      <form className="bookmark-form" onSubmit={handleSubmit}>
        <h2>Add New Bookmark</h2>
        
        <div className="form-group">
          <label htmlFor="title">Site Name</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Google"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            required
            placeholder="e.g. https://google.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="memo">Memo</label>
          <textarea
            id="memo"
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            rows="3"
            placeholder="Why are you saving this?"
          ></textarea>
        </div>

        <button type="submit" className="btn-primary">Save Bookmark</button>
      </form>
    </div>
  );
};

export default BookmarkForm;
