import { useEffect } from 'react';
import { usePomodoro } from '../hooks/usePomodoro';

const PomodoroTimer = () => {
  const {
    timeLeft,
    isRunning,
    isBreak,
    cycles,
    formattedTime,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
  } = usePomodoro();

  // Bildirim izni iste
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // SVG progress ring için hesaplamalar
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="card p-6 animate-fade-in">
      <div className="text-center">
        {/* Başlık */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">
            Pomodoro Timer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Stay focused and productive with the Pomodoro Technique
          </p>
        </div>

        {/* Timer görünümü */}
        <div className="relative mb-6">
          {/* SVG Progress Ring */}
          <div className="w-56 h-56 mx-auto relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
              {/* Background circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              
              {/* Progress circle */}
              <circle
                cx="110"
                cy="110"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className={`transition-all duration-1000 ${
                  isBreak ? 'text-green-500' : 'text-blue-600'
                }`}
              />
            </svg>
            
            {/* Timer content overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-4xl font-bold mb-2 ${
                isBreak ? 'text-green-600' : 'text-blue-600'
              }`}>
                {formattedTime}
              </div>
              <div className={`text-base font-semibold px-3 py-1 rounded-full ${
                isBreak 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {isBreak ? 'Break Time' : 'Work Time'}
              </div>
            </div>
          </div>
        </div>

        {/* Kontrol butonları */}
        <div className="flex justify-center space-x-4 mb-6">
          {!isRunning ? (
            <button
              onClick={startTimer}
              className="btn-primary flex items-center space-x-2 text-base px-6 py-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Start</span>
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="btn-secondary flex items-center space-x-2 text-base px-6 py-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Pause</span>
            </button>
          )}
          
          <button
            onClick={resetTimer}
            className="btn-secondary flex items-center space-x-2 text-base px-6 py-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset</span>
          </button>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card p-4 text-center hover-lift">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {cycles}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Completed Cycles
            </div>
          </div>
          <div className="card p-4 text-center hover-lift">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {Math.floor(cycles * 25 / 60)}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Total Hours
            </div>
          </div>
        </div>

        {/* Bilgi notu */}
        <div className="glass p-4 rounded-xl">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                Pomodoro Technique
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                25 minutes of focused work, followed by 5 minutes of break. After every 4 cycles, 
                take a longer 15-minute break to maintain productivity and mental clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer; 