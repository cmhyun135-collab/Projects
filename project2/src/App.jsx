import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookmarkProvider } from './context/BookmarkContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Add from './pages/Add';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
