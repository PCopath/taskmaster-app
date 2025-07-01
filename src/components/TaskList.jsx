import { useTasks, CATEGORY_LABELS } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { 
    filteredTasks, 
    filter, 
    categoryFilter, 
    setFilter, 
    setCategoryFilter 
  } = useTasks();

  return (
    <div className="space-y-6">
      {/* Filtreler */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Durum filtresi */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status Filter
            </label>
            <div className="flex space-x-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${
                    filter === value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Kategori filtresi */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Filter
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="input text-sm"
            >
              <option value="all">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Görev listesi */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          // Boş durum
          <div className="card p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {filter === 'all' && categoryFilter === 'all' 
                ? 'No tasks added yet' 
                : 'No tasks match the filter'
              }
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'all' && categoryFilter === 'all'
                ? 'Add your first task to get started!'
                : 'Try different filters or add a new task.'
              }
            </p>
          </div>
        ) : (
          // Görev listesi
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Sonuç sayısı */}
      {filteredTasks.length > 0 && (
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default TaskList; 