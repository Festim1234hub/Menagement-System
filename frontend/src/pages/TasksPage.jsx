import { useState, useMemo } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskBoard from '../components/tasks/TaskBoard';

const mockTasks = [
  { id: 1, title: 'Design homepage', description: 'Create mockups for the new homepage.', status: 'done', priority: 'high', due_date: '2024-04-01' },
  { id: 2, title: 'Setup API routes', description: 'Define all REST endpoints.', status: 'in_progress', priority: 'high', due_date: '2024-04-10' },
  { id: 3, title: 'Write unit tests', description: 'Cover core business logic.', status: 'todo', priority: 'medium', due_date: '2024-04-20' },
  { id: 4, title: 'Deploy to staging', description: 'Push latest build to staging server.', status: 'todo', priority: 'low', due_date: '2024-04-25' },
];

function TasksPage({ project, onBack }) {
  const [tasks, setTasks] = useState(mockTasks);
  const [view, setView] = useState('board');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'all' || t.status === filterStatus;
      const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [tasks, search, filterStatus, filterPriority]);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h2 className="tasks-title">{project ? project.name : 'Tasks'}</h2>
        <div className="view-toggle">
          <button className={`btn-view ${view === 'board' ? 'active' : ''}`} onClick={() => setView('board')}>Board</button>
          <button className={`btn-view ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
        </div>
        <button className="btn-primary">+ New Task</button>
      </div>
      <div className="tasks-filters">
        <input
          className="filter-search"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <select className="filter-select" value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {view === 'board'
        ? <TaskBoard tasks={filteredTasks} onStatusChange={handleStatusChange} />
        : <TaskList tasks={filteredTasks} />
      }
    </div>
  );
}

export default TasksPage;
