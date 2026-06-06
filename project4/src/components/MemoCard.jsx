import React from 'react';
import { Trash2 } from 'lucide-react';

const MemoCard = ({ memo, onDelete }) => {
  // Format the date nicely
  const formattedDate = memo.createdAt?.toDate 
    ? memo.createdAt.toDate().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '방금 전';

  return (
    <div className="memo-card">
      <div className="memo-content">
        <p>{memo.text}</p>
      </div>
      <div className="memo-footer">
        <span className="memo-date">{formattedDate}</span>
        <button 
          onClick={() => onDelete(memo.id)} 
          className="btn-icon delete-btn"
          title="메모 삭제"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MemoCard;
