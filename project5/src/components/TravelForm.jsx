import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function TravelForm({ onSubmit, isLoading }) {
  const [preferences, setPreferences] = useState({
    season: '봄',
    vibe: '휴식/힐링',
    budget: '적당함',
    companions: '커플 (2인)',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form className="travel-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="season">계절</label>
        <select id="season" name="season" value={preferences.season} onChange={handleChange} disabled={isLoading}>
          <option value="봄">봄</option>
          <option value="여름">여름</option>
          <option value="가을">가을</option>
          <option value="겨울">겨울</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="vibe">분위기 / 테마</label>
        <select id="vibe" name="vibe" value={preferences.vibe} onChange={handleChange} disabled={isLoading}>
          <option value="휴식/힐링">휴식/힐링</option>
          <option value="액티비티/모험">액티비티/모험</option>
          <option value="문화/역사">문화/역사</option>
          <option value="자연/풍경">자연/풍경</option>
          <option value="도심 탐험">도심 탐험</option>
          <option value="맛집 투어">맛집 투어</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="budget">예산</label>
        <select id="budget" name="budget" value={preferences.budget} onChange={handleChange} disabled={isLoading}>
          <option value="가성비">가성비</option>
          <option value="적당함">적당함</option>
          <option value="럭셔리">럭셔리</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="companions">동행 인원</label>
        <select id="companions" name="companions" value={preferences.companions} onChange={handleChange} disabled={isLoading}>
          <option value="혼자">혼자</option>
          <option value="커플 (2인)">커플 (2인)</option>
          <option value="가족">가족</option>
          <option value="친구들">친구들</option>
        </select>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            발견하는 중...
          </>
        ) : (
          <>
            <Send size={18} />
            추천받기
          </>
        )}
      </button>
    </form>
  );
}
