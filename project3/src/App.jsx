import React, { useState, useEffect } from 'react';
import { Moon, Sun, CloudRain } from 'lucide-react';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import WeatherCard from './components/WeatherCard';
import AICard from './components/AICard';
import { fetchWeather } from './services/weatherApi';
import { generateWeatherMessage } from './services/geminiApi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [aiMessage, setAiMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 초기화: 다크모드 및 최근 검색어 로드
  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  const handleSearch = async (city) => {
    setIsLoading(true);
    setError('');
    setWeatherData(null);
    setAiMessage('');

    try {
      // 1. 날씨 정보 가져오기
      const weather = await fetchWeather(city);
      setWeatherData(weather);

      // 최근 검색어 업데이트
      const updatedSearches = [weather.city, ...recentSearches.filter(c => c !== weather.city)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      // 2. AI 한마디 생성하기
      const message = await generateWeatherMessage(weather);
      setAiMessage(message);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">
          <CloudRain size={28} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'bottom' }} />
          오늘의 날씨
        </h1>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="테마 변경">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <RecentSearches searches={recentSearches} onSelect={handleSearch} />
        </section>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {isLoading && !weatherData && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>날씨 정보를 불러오고 있습니다...</p>
          </div>
        )}

        {weatherData && (
          <WeatherCard data={weatherData} />
        )}

        {isLoading && weatherData && !aiMessage && (
          <div className="spinner-container" style={{ padding: '1rem 0' }}>
            <div className="spinner" style={{ width: '30px', height: '30px', borderWidth: '2px' }}></div>
            <p style={{ fontSize: '0.875rem' }}>AI가 날씨에 어울리는 한마디를 생각 중이에요...</p>
          </div>
        )}

        {aiMessage && (
          <AICard message={aiMessage} />
        )}
      </main>
    </div>
  );
}

export default App;
