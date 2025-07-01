import { useState } from 'react';
import { useTasks, TASK_CATEGORIES, CATEGORY_LABELS } from '../context/TaskContext';

const TaskForm = () => {
  const { addTask } = useTasks();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: TASK_CATEGORIES.PERSONAL,
    dueDate: '',
  });

  // Form verilerini güncelle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Form gönder
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    // Yeni görev ekle
    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      dueDate: formData.dueDate || null,
    });

    // Formu sıfırla
    setFormData({
      title: '',
      description: '',
      category: TASK_CATEGORIES.PERSONAL,
      dueDate: '',
    });

    // Formu kapat
    setIsExpanded(false);
  };

  // Formu iptal et
  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      category: TASK_CATEGORIES.PERSONAL,
      dueDate: '',
    });
    setIsExpanded(false);
  };

  return (
    <div className="card p-8 mb-8 animate-fade-in hover-lift">
      {!isExpanded ? (
        // Kapalı durum - sadece "Yeni Görev" butonu
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="text-center">
            <span className="text-lg font-semibold block mb-1">Add New Task</span>
            <span className="text-sm opacity-75">Click to create your first task</span>
          </div>
        </button>
      ) : (
        // Açık durum - form
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold gradient-text mb-2">Create New Task</h2>
            <p className="text-gray-600 dark:text-gray-400">Fill in the details below to add a new task</p>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter task title..."
              className="input focus-ring"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Task description (optional)..."
              rows="4"
              className="input resize-none focus-ring"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="input focus-ring"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              <input
                type="datetime-local"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="input focus-ring"
              />
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
              disabled={!formData.title.trim()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Add Task</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm; 