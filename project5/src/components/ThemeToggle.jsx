import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
