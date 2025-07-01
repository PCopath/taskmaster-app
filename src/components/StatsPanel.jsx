import { useTasks, CATEGORY_LABELS, CATEGORY_COLORS } from '../context/TaskContext';

const StatsPanel = () => {
  const { stats, tasks } = useTasks();

  // Kategori bazında istatistikler
  const getCategoryStats = () => {
    const categoryCounts = {};
    const categoryCompleted = {};

    tasks.forEach(task => {
      if (!categoryCounts[task.category]) {
        categoryCounts[task.category] = 0;
        categoryCompleted[task.category] = 0;
      }
      categoryCounts[task.category]++;
      if (task.completed) {
        categoryCompleted[task.category]++;
      }
    });

    return Object.keys(categoryCounts).map(category => ({
      category,
      label: CATEGORY_LABELS[category],
      total: categoryCounts[category],
      completed: categoryCompleted[category],
      pending: categoryCounts[category] - categoryCompleted[category],
      completionRate: Math.round((categoryCompleted[category] / categoryCounts[category]) * 100),
      color: CATEGORY_COLORS[category],
    }));
  };

  const categoryStats = getCategoryStats();

  // Gecikmiş görev sayısı
  const overdueTasks = tasks.filter(task => 
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
  ).length;

  // Bugün biten görev sayısı
  const today = new Date();
  const todayTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate).toDateString() === today.toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Genel istatistikler */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          General Statistics
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total Tasks
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Pending
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completion Rate
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
              <span>Progress</span>
              <span>{stats.completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Özel durumlar */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Special Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-8 h-8 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                {overdueTasks}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400">
                Overdue Tasks
              </div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                {todayTasks}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Due Today
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori bazında istatistikler */}
      {categoryStats.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            By Category
          </h2>
          
          <div className="space-y-4">
            {categoryStats.map(({ category, label, total, completed, pending, completionRate, color }) => (
              <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
                      {label}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {total} tasks
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {completionRate}%
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Completed: {completed}</span>
                  <span>Pending: {pending}</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${completionRate}%`,
                      backgroundColor: category === 'work' ? '#3b82f6' :
                                    category === 'personal' ? '#10b981' :
                                    category === 'urgent' ? '#ef4444' :
                                    category === 'shopping' ? '#8b5cf6' :
                                    '#f97316'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPanel; 