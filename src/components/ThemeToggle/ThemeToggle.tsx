import { useEffect, useState } from 'react';
import './ThemeToggle.scss';

type Theme = 'dark' | 'light';

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return 'dark';
};
    
const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark'
    );
  };

  return (
    <button
      className={`theme-toggle theme-toggle--${theme}`}
      onClick={toggleTheme}
      aria-label={
        theme === 'dark'
          ? 'Включить тёмную тему'
          : 'Включить светлую тему'
      }
      type="button"
    >
        
      <span className="theme-toggle__icon">
        {theme === 'dark' ? '☾' : '☀'}
      </span>
    </button>
  );
};

export default ThemeToggle;