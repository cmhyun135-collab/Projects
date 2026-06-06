import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function DiaryCard({ diary, onDelete }) {
  const { title, content, date, emotion, analysis } = diary;
  const colorMap = {
    joy: 'bg-emotion-joy',
    sadness: 'bg-emotion-sadness',
    anger: 'bg-emotion-anger',
    calm: 'bg-emotion-calm',
    anxiety: 'bg-emotion-anxiety',
    excitement: 'bg-emotion-excitement',
  };
  const bgClass = colorMap[analysis?.emotion?.toLowerCase()] || 'bg-gray-200';

  return (
    <motion.div
      className={`rounded-xl shadow-lg p-4 bg-white dark:bg-gray-800 ${bgClass} transition-colors`}
      layout
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
        <button
          onClick={() => onDelete(diary.id)}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{new Date(date).toLocaleDateString()}</p>
      <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">{content}</p>
      {analysis && (
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="font-medium">AI 분석: {analysis.emotion} ({analysis.score})</p>
          <p className="text-sm">{analysis.analysis}</p>
          <p className="italic text-sm mt-1">{analysis.message}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    const diariesRef = collection(db, 'diaries');
    const q = query(diariesRef, where('uid', '==', currentUser.uid), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDiaries(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      toast.error('다이어리를 불러오는 중 오류 발생');
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'diaries', id));
      toast.success('삭제됐어요!');
    } catch (e) {
      console.error(e);
      toast.error('삭제 실패');
    }
  };

  if (loading) return <p className="text-center mt-8">로드 중...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">내 일기</h1>
        <button
          onClick={() => navigate('/write')}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          새 일기 작성
        </button>
      </div>
      {diaries.length === 0 ? (
        <p className="text-center text-gray-500">아직 일기가 없어요.</p>
      ) : (
        <motion.div layout className="grid gap-4 md:grid-cols-2">
          {diaries.map((d) => (
            <DiaryCard key={d.id} diary={d} onDelete={handleDelete} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
