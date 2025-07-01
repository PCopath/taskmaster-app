import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import StatsPanel from './components/StatsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('tasks'); // tasks, timer, stats

  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: '📋', description: 'Manage your tasks' },
    { id: 'timer', label: 'Pomodoro', icon: '⏰', description: 'Focus timer' },
    { id: 'stats', label: 'Statistics', icon: '📊', description: 'View analytics' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Tab değişiminde sayfanın yukarıda kalmasını sağla
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex flex-col">
          <Header />
          
          <main className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
            <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Tab Navigation - Normal flow */}
              <div className="mb-8 flex justify-center">
                <nav className="glass rounded-2xl p-2 shadow-lg backdrop-blur-md border border-white/20 dark:border-gray-700/20">
                  <div className="flex space-x-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`relative flex flex-col items-center space-y-1 px-6 py-4 rounded-xl text-sm font-medium transition-all duration-300 min-w-[120px] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                        aria-label={`Switch to ${tab.label} tab`}
                      >
                        <span className="text-xl mb-1 transition-transform duration-200 group-hover:scale-110">{tab.icon}</span>
                        <span className="font-semibold">{tab.label}</span>
                        <span className={`text-xs opacity-75 transition-opacity duration-200 ${
                          activeTab === tab.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-75'
                        }`}>
                          {tab.description}
                        </span>
                        
                        {/* Active indicator */}
                        {activeTab === tab.id && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </nav>
              </div>

              {/* Tab Content - Smooth transition */}
              <div className="animate-fade-in min-h-[600px]">
                {activeTab === 'tasks' && (
                  <div className="space-y-8">
                    <TaskForm />
                    <TaskList />
                  </div>
                )}
                
                {activeTab === 'timer' && (
                  <div className="max-w-2xl mx-auto">
                    <PomodoroTimer />
                  </div>
                )}
                
                {activeTab === 'stats' && (
                  <StatsPanel />
                )}
              </div>
            </div>
          </main>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
