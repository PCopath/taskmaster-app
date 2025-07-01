import { useState } from 'react';
import { useTasks, CATEGORY_LABELS, CATEGORY_COLORS } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskCompletion } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate ? task.dueDate.slice(0, 16) : '',
  });

  // Tarih formatla
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Gecikmiş mi kontrol et
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  // Düzenleme modunu başlat
  const handleEdit = () => {
    setEditData({
      title: task.title,
      description: task.description,
      category: task.category,
      dueDate: task.dueDate ? task.dueDate.slice(0, 16) : '',
    });
    setIsEditing(true);
  };

  // Düzenlemeyi kaydet
  const handleSave = () => {
    updateTask(task.id, {
      title: editData.title.trim(),
      description: editData.description.trim(),
      category: editData.category,
      dueDate: editData.dueDate || null,
    });
    setIsEditing(false);
  };

  // Düzenlemeyi iptal et
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Görevi sil
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  // Input değişikliklerini yakala
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isEditing) {
    return (
      <div className="card p-6 mb-4 animate-slide-up hover-lift">
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="input font-semibold text-lg focus-ring"
            placeholder="Task title"
          />
          
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            className="input resize-none focus-ring"
            rows="3"
            placeholder="Description"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <select
              name="category"
              value={editData.category}
              onChange={handleInputChange}
              className="input focus-ring"
            >
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
            
            <input
              type="datetime-local"
              name="dueDate"
              value={editData.dueDate}
              onChange={handleInputChange}
              className="input focus-ring"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </button>
            <button 
              onClick={handleSave} 
              className="btn-success flex items-center space-x-2"
              disabled={!editData.title.trim()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`card p-6 mb-4 transition-all duration-300 hover-lift hover-glow ${
      task.completed ? 'opacity-75' : ''
    } ${isOverdue ? 'border-red-300 dark:border-red-600 shadow-red-500/25' : ''}`}>
      <div className="flex items-start space-x-4">
        {/* Tamamlanma checkbox'ı */}
        <button
          onClick={() => toggleTaskCompletion(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110 ${
            task.completed
              ? 'bg-gradient-to-r from-green-500 to-green-600 border-green-500 shadow-lg'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:shadow-md'
          }`}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        {/* Görev içeriği */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className={`text-lg font-semibold text-gray-900 dark:text-white mb-2 ${
                task.completed ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-gray-600 dark:text-gray-300 mb-3 ${
                  task.completed ? 'text-gray-400' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Kategori etiketi */}
            <span className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${CATEGORY_COLORS[task.category]} shadow-sm`}>
              {CATEGORY_LABELS[task.category]}
            </span>
          </div>

          {/* Tarih ve durum bilgileri */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              {task.dueDate && (
                <span className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                  isOverdue ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{formatDate(task.dueDate)}</span>
                  {isOverdue && <span className="text-red-600 dark:text-red-400 font-semibold">(Overdue)</span>}
                </span>
              )}
              
              <span className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{new Date(task.createdAt).toLocaleDateString('en-US')}</span>
              </span>
            </div>

            {/* Aksiyon butonları */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEdit}
                className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110 focus-ring rounded-lg"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              
              <button
                onClick={handleDelete}
                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:scale-110 focus-ring rounded-lg"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem; 