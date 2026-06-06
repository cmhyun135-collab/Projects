import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { LogOut, Plus, PenLine, FileText } from 'lucide-react';
import MemoCard from '../components/MemoCard';

const Memo = () => {
  const { currentUser, logout } = useAuth();
  const [memos, setMemos] = useState([]);
  const [newMemo, setNewMemo] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch memos in real-time
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, 'memos'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const memoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMemos(memoData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching memos: ", error);
      toast.error("메모를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃 되었습니다.');
    } catch (error) {
      toast.error('로그아웃에 실패했습니다.');
    }
  };

  const handleAddMemo = async (e) => {
    e.preventDefault();
    
    if (!newMemo.trim()) {
      toast.error('메모 내용을 입력해주세요.');
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, 'memos'), {
        text: newMemo.trim(),
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      setNewMemo('');
      toast.success('저장됐어요!');
    } catch (error) {
      console.error("Error adding memo: ", error);
      toast.error('메모 저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMemo = async (id) => {
    if (!window.confirm('정말로 이 메모를 삭제하시겠습니까?')) return;
    
    try {
      await deleteDoc(doc(db, 'memos', id));
      toast.success('삭제됐어요!');
    } catch (error) {
      console.error("Error deleting memo: ", error);
      toast.error('메모 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="memo-page">
      <header className="memo-header">
        <div className="header-content">
          <div className="logo-area">
            <PenLine size={28} className="logo-icon" />
            <h1>나만의 메모</h1>
          </div>
          <div className="user-area">
            <span className="user-email">{currentUser.email}</span>
            <button onClick={handleLogout} className="btn-icon logout-btn" title="로그아웃">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="memo-main">
        <div className="memo-input-section">
          <form onSubmit={handleAddMemo} className="memo-form">
            <textarea
              placeholder="무엇을 기억하고 싶으신가요?"
              value={newMemo}
              onChange={(e) => setNewMemo(e.target.value)}
              rows={4}
              disabled={submitting}
            />
            <div className="form-actions">
              <span className="memo-count">
                <FileText size={16} />
                총 {memos.length}개의 메모
              </span>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={submitting || !newMemo.trim()}
              >
                <Plus size={18} />
                {submitting ? '저장 중...' : '메모 저장'}
              </button>
            </div>
          </form>
        </div>

        <div className="memo-list-section">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>메모를 불러오는 중입니다...</p>
            </div>
          ) : memos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>작성된 메모가 없습니다</h3>
              <p>첫 번째 메모를 작성해보세요!</p>
            </div>
          ) : (
            <div className="memo-grid">
              {memos.map(memo => (
                <MemoCard 
                  key={memo.id} 
                  memo={memo} 
                  onDelete={handleDeleteMemo} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Memo;
