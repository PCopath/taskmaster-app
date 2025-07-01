import { createContext, useContext, useEffect, useState } from 'react';

// Görev context'i oluştur
const TaskContext = createContext();

// Görev kategorileri
export const TASK_CATEGORIES = {
  WORK: 'work',
  PERSONAL: 'personal',
  URGENT: 'urgent',
  SHOPPING: 'shopping',
  HEALTH: 'health',
};

// Kategori etiketleri
export const CATEGORY_LABELS = {
  [TASK_CATEGORIES.WORK]: 'Work',
  [TASK_CATEGORIES.PERSONAL]: 'Personal',
  [TASK_CATEGORIES.URGENT]: 'Urgent',
  [TASK_CATEGORIES.SHOPPING]: 'Shopping',
  [TASK_CATEGORIES.HEALTH]: 'Health',
};

// Kategori renkleri
export const CATEGORY_COLORS = {
  [TASK_CATEGORIES.WORK]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  [TASK_CATEGORIES.PERSONAL]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  [TASK_CATEGORIES.URGENT]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  [TASK_CATEGORIES.SHOPPING]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  [TASK_CATEGORIES.HEALTH]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

// Görev provider bileşeni
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    // LocalStorage'dan görevleri yükle
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Görevler değiştiğinde LocalStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Yeni görev ekle
  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      title: task.title,
      description: task.description || '',
      category: task.category || TASK_CATEGORIES.PERSONAL,
      dueDate: task.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Görev güncelle
  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  // Görev sil
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Görev durumunu değiştir
  const toggleTaskCompletion = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filtrelenmiş görevleri al
  const getFilteredTasks = () => {
    let filtered = tasks;

    // Durum filtresi
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    // Kategori filtresi
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }

    return filtered;
  };

  // İstatistikleri hesapla
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  const value = {
    tasks,
    filteredTasks: getFilteredTasks(),
    filter,
    categoryFilter,
    stats: getStats(),
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    setFilter,
    setCategoryFilter,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook - görev context'ini kullanmak için
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}; 