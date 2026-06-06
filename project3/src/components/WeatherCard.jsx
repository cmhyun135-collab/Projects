import React from 'react';
import { Droplets, Wind } from 'lucide-react';

const WeatherCard = ({ data }) => {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <div className="glass-card">
      <div className="weather-header">
        <h2 className="city-name">{data.city}</h2>
        <img src={iconUrl} alt={data.condition} className="weather-icon" />
      </div>
      
      <div className="temp-container">
        <span className="temperature">{data.temperature}</span>
        <span className="temp-unit">°C</span>
      </div>
      
      <div className="condition">{data.condition}</div>
      
      <div className="weather-details">
        <div className="detail-item">
          <Droplets className="detail-icon" size={24} />
          <div className="detail-info">
            <span className="detail-label">습도</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
        </div>
        
        <div className="detail-item">
          <Wind className="detail-icon" size={24} />
          <div className="detail-info">
            <span className="detail-label">풍속</span>
            <span className="detail-value">{data.windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
