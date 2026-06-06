import { useState } from 'react';
import { MapPin, Coins, Info, Copy, Check } from 'lucide-react';

export default function DestinationCard({ destination }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `여행지: ${destination.name}\n비용: ${destination.cost}\n추천 이유: ${destination.reason}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="destination-card">
      <div className="card-header">
        <h3 className="card-title">
          <MapPin className="text-primary" size={20} />
          {destination.name}
        </h3>
        <button 
          onClick={handleCopy} 
          className="copy-btn" 
          aria-label="Copy to clipboard"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
        </button>
      </div>
      
      <div className="card-body">
        <div className="info-row">
          <span className="icon-wrapper"><Coins size={16} /></span>
          <span className="cost-text">{destination.cost}</span>
        </div>
        <div className="info-row description-row">
          <span className="icon-wrapper"><Info size={16} /></span>
          <p className="reason-text">{destination.reason}</p>
        </div>
      </div>
    </div>
  );
}
