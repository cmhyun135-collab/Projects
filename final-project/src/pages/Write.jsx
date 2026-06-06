import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { analyzeDiary } from '../utils/gemini';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Calendar, Smile, PenTool, Loader2 } from 'lucide-react';

export default function Write() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [emotion, setEmotion] = useState('😊');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !title || !content) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      // Gemini 분석 호출
      const analysis = await analyzeDiary(content);
      // Firestore 저장
      await addDoc(collection(db, 'diaries'), {
        uid: currentUser.uid,
        date,
        emotion,
        title,
        content,
        analysis,
        createdAt: serverTimestamp()
      });
      toast.success('일기가 저장됐어요!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          새 일기 쓰기
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">날짜</span>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">감정 이모지</span>
              <input
                type="text"
                maxLength={2}
                required
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full mt-1 p-2 text-2xl text-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">제목</span>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">내용</span>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mr-2 w-5 h-5" /> : <PenTool className="mr-2 w-5 h-5" />}
            {loading ? '저장 중...' : '일기 저장'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
