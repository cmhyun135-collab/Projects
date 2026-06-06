import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, Mail, Lock, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      navigate('/memo');
      toast.success('로그인 성공!');
    } catch (error) {
      console.error(error);
      toast.error('구글 로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      if (isLoginMode) {
        await loginWithEmail(email, password);
        toast.success('로그인 성공!');
      } else {
        await signupWithEmail(email, password);
        toast.success('회원가입 및 로그인 성공!');
      }
      navigate('/memo');
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      } else if (error.code === 'auth/email-already-in-use') {
        toast.error('이미 사용 중인 이메일입니다.');
      } else {
        toast.error('인증 처리 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">
          {isLoginMode ? '환영합니다! 👋' : '새로운 계정 만들기 ✨'}
        </h1>
        <p className="login-subtitle">
          메모 앱을 이용하려면 로그인이 필요합니다.
        </p>

        <form onSubmit={handleEmailAuth} className="login-form">
          <div className="input-group">
            <Mail size={20} className="input-icon" />
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? '처리 중...' : (isLoginMode ? '로그인' : '회원가입')}
          </button>
        </form>

        <div className="divider">
          <span>또는</span>
        </div>

        <button 
          onClick={handleGoogleLogin} 
          className="btn btn-outline btn-block btn-google"
          disabled={loading}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="google-icon" />
          구글 계정으로 {isLoginMode ? '로그인' : '가입하기'}
        </button>

        <div className="login-footer">
          {isLoginMode ? (
            <p>
              계정이 없으신가요?{' '}
              <button className="text-btn" onClick={() => setIsLoginMode(false)}>
                회원가입
              </button>
            </p>
          ) : (
            <p>
              이미 계정이 있으신가요?{' '}
              <button className="text-btn" onClick={() => setIsLoginMode(true)}>
                로그인
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
