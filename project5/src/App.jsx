import { useState, useRef, useEffect } from 'react';
import { Compass, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import TravelForm from './components/TravelForm';
import DestinationCard from './components/DestinationCard';
import ThemeToggle from './components/ThemeToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import { startTravelChat, getNextTravelRecommendations } from './services/gemini';

function App() {
  const [recommendations, setRecommendations] = useLocalStorage('travel-recommendations', null);
  const [lastUpdated, setLastUpdated] = useLocalStorage('travel-last-updated', null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Keep the chat session across renders
  const chatSessionRef = useRef(null);
  // Keep last used preferences to enable "regenerate" properly
  const [lastPreferences, setLastPreferences] = useState(null);

  // Initialize chat session once
  useEffect(() => {
    if (!chatSessionRef.current) {
      try {
        chatSessionRef.current = startTravelChat();
      } catch (err) {
        console.error("Failed to initialize chat session", err);
      }
    }
  }, []);

  const handleGenerate = async (preferences) => {
    setIsLoading(true);
    setError(null);
    setLastPreferences(preferences);

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = startTravelChat();
      }
      const results = await getNextTravelRecommendations(chatSessionRef.current, preferences);
      setRecommendations(results);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(err.message || '예상치 못한 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (lastPreferences) {
      handleGenerate(lastPreferences);
    } else {
      setError("먼저 여행 취향을 입력해주세요.");
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <Compass className="logo-icon text-primary" size={32} />
          <h1>AI 여행 탐험가</h1>
        </div>
        <ThemeToggle />
      </header>

      <main className="main-content">
        <section className="form-section glass-panel">
          <div className="section-header">
            <h2>완벽한 여행지 찾기</h2>
            <p>원하시는 여행 취향을 알려주시면 AI가 3곳의 멋진 여행지를 추천해 드립니다.</p>
          </div>
          <TravelForm onSubmit={handleGenerate} isLoading={isLoading} />
        </section>

        <section className="results-section">
          {error && (
            <div className="error-message glass-panel">
              <AlertCircle className="error-icon" size={20} />
              <p>{error}</p>
            </div>
          )}

          {recommendations && recommendations.length > 0 && !error && (
            <div className="recommendations-container glass-panel">
              <div className="results-header">
                <div className="results-title-group">
                  <h2>추천 여행지</h2>
                  {lastUpdated && (
                    <span className="last-updated">
                      <Clock size={14} /> {lastUpdated}
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleRegenerate} 
                  className="regenerate-btn" 
                  disabled={isLoading}
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                  다시 추천받기
                </button>
              </div>

              <div className="cards-grid">
                {recommendations.map((dest, index) => (
                  <DestinationCard key={index} destination={dest} />
                ))}
              </div>
            </div>
          )}
          
          {!recommendations && !isLoading && !error && (
            <div className="empty-state glass-panel">
              <Compass size={48} className="empty-icon" />
              <p>AI가 맞춤 큐레이션한 여행지가 이곳에 표시됩니다.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
