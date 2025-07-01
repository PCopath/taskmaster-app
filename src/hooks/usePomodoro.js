import { useState, useEffect, useRef, useCallback } from 'react';

// Pomodoro timer custom hook
export const usePomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 dakika (saniye cinsinden)
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Ses dosyasını yükle
  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
    audioRef.current.volume = 0.5;
  }, []);

  // Timer'ı başlat
  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer bitti
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          
          // Ses çal
          if (audioRef.current) {
            audioRef.current.play().catch(console.error);
          }
          
          // Bildirim göster
          if (Notification.permission === 'granted') {
            new Notification(
              isBreak ? 'Mola Bitti!' : 'Pomodoro Bitti!',
              {
                body: isBreak ? 'Çalışmaya geri dönün' : 'Mola zamanı!',
                icon: '/favicon.ico'
              }
            );
          }
          
          // Mola/çalışma geçişi
          if (isBreak) {
            setIsBreak(false);
            setTimeLeft(25 * 60); // 25 dakika çalışma
            setCycles(prev => prev + 1);
          } else {
            setIsBreak(true);
            setTimeLeft(5 * 60); // 5 dakika mola
          }
          
          return isBreak ? 25 * 60 : 5 * 60;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isBreak]);

  // Timer'ı durdur
  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // Timer'ı sıfırla
  const resetTimer = useCallback(() => {
    pauseTimer();
    setIsBreak(false);
    setTimeLeft(25 * 60);
    setCycles(0);
  }, [pauseTimer]);

  // Component unmount olduğunda interval'i temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Zamanı formatla (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Kalan yüzdeyi hesapla
  const getProgress = () => {
    const totalTime = isBreak ? 5 * 60 : 25 * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  return {
    timeLeft,
    isRunning,
    isBreak,
    cycles,
    formattedTime: formatTime(timeLeft),
    progress: getProgress(),
    startTimer,
    pauseTimer,
    resetTimer,
  };
}; 