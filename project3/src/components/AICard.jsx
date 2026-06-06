import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

const AICard = ({ message }) => {
  const [copied, setCopied] = useState(false);

  if (!message) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="glass-card" style={{ animationDelay: '0.2s' }}>
      <div className="ai-header">
        <Sparkles size={20} />
        <span className="ai-title">오늘의 한마디</span>
      </div>
      
      <div className="ai-content">
        {message}
      </div>
      
      <div className="copy-container">
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="한마디 복사하기"
        >
          {copied ? (
            <>
              <Check size={16} />
              복사 완료!
            </>
          ) : (
            <>
              <Copy size={16} />
              복사하기
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AICard;
