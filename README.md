# TaskMaster App - Task & Time Management

A modern, user-friendly task management and Pomodoro timer application built with React, Context API, and TailwindCSS.

## 🚀 Features

### 📋 Task Management
- ✅ Add, edit, and delete tasks
- 🏷️ Organize tasks by category (Work, Personal, Urgent, Shopping, Health)
- 📅 Set due dates and get overdue alerts
- 🔍 Filter by status and category
- 💾 Data persistence with LocalStorage

### ⏰ Pomodoro Timer
- 🎯 25-minute work / 5-minute break cycles
- ⏸️ Start, pause, and reset controls
- 📊 Visual progress ring and cycle counter
- 🔔 Sound and notification alerts
- 📈 Completed cycle statistics

### 📊 Statistics
- 📈 General task statistics
- 🎯 Performance analysis by category
- ⏰ Overdue task tracking
- 📅 Daily task summary

### 🎨 User Experience
- 🌙 Light/Dark theme support
- 📱 Responsive design (mobile-friendly)
- ✨ Smooth animations and transitions
- 🎯 Modern and clean interface

## 🛠️ Technologies

- **React 19** - Modern React hooks and functional components
- **Vite** - Fast development environment
- **TailwindCSS** - Utility-first CSS framework
- **Context API** - State management
- **LocalStorage** - Data persistence
- **Custom Hooks** - Pomodoro timer logic

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd taskmaster-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header and theme toggle
│   ├── TaskForm.jsx    # Add new task form
│   ├── TaskItem.jsx    # Single task item
│   ├── TaskList.jsx    # Task list and filtering
│   ├── PomodoroTimer.jsx # Pomodoro timer component
│   └── StatsPanel.jsx  # Statistics panel
├── context/            # React Context API
│   ├── ThemeContext.jsx # Theme management
│   └── TaskContext.jsx # Task management
├── hooks/              # Custom React hooks
│   └── usePomodoro.js  # Pomodoro timer logic
├── styles/             # CSS files
└── utils/              # Utility functions
```

## 🎯 Usage

### Add a Task
1. Go to the "Tasks" section
2. Click "Add New Task"
3. Enter the title, description, category, and due date
4. Click "Add Task"

### Pomodoro Timer
1. Go to the "Pomodoro" section
2. Click "Start"
3. After 25 minutes, a break will start automatically
4. After 5 minutes, the next work cycle begins

### Statistics
1. Go to the "Statistics" section
2. View your overall and category-based performance
3. Track overdue tasks

## 🔧 Development

### Adding New Features
1. Create the relevant component in `src/components/`
2. Add new context or hook if needed
3. Integrate the component in `App.jsx`

### Styling
- Use TailwindCSS utility classes
- Add custom CSS in `src/index.css`
- Customize the theme in `tailwind.config.js`

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions, please open an issue.

---

Boost your productivity with **TaskMaster App**! 🚀
