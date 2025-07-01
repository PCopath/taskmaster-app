import { createContext, useContext, useEffect, useState } from 'react';

// Tema context'i oluştur
const ThemeContext = createContext();

// Tema provider bileşeni
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    // LocalStorage'dan tema tercihini al, yoksa sistem tercihini kullan
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Tema değiştiğinde DOM'a uygula
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const value = {
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook - tema context'ini kullanmak için
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 