import { useState, useMemo, useEffect } from 'react';
import TaskList from '../components/tasks/TaskList';
import TaskBoard from '../components/tasks/TaskBoard';
import Modal from '../components/shared/Modal';
import TaskForm from '../components/tasks/TaskForm';
import useTasks from '../hooks/useTasks';
import adminService from '../services/adminService';
import useAuth from '../hooks/useAuth';

function TasksPage({ project, onBack }) {
  const { user } = useAuth();
  const { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask } = useTasks(project?.id);
  const [view, setView] = useState('board');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (user?.role === 'admin') {
      adminService.getUsers().then(setUsers).catch(() => {});
    }
  }, [user]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  const handleCreate = async (data) => {
    await createTask(data);
    setShowCreate(false);
  };

  const handleUpdate = async (data) => {
    await updateTask(editTask.id, data);
    setEditTask(null);
  };

  const handleDelete = async (task) => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      await deleteTask(task.id);
    }
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
        <button className="btn-primary" onClick={() => setShowCreate(true)}>+ New Task</button>
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

      {loading && <p className="empty-state">Loading tasks...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && (
        view === 'board'
          ? <TaskBoard tasks={filteredTasks} users={users} onStatusChange={handleStatusChange} onEditTask={setEditTask} onDeleteTask={handleDelete} />
          : <TaskList tasks={filteredTasks} users={users} onEditTask={setEditTask} onDeleteTask={handleDelete} />
      )}

      {showCreate && (
        <Modal title="New Task" onClose={() => setShowCreate(false)}>
          <TaskForm users={users} onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
        </Modal>
      )}
      {editTask && (
        <Modal title="Edit Task" onClose={() => setEditTask(null)}>
          <TaskForm users={users} initial={editTask} onSubmit={handleUpdate} onCancel={() => setEditTask(null)} />
        </Modal>
      )}
    </div>
  );
}

export default TasksPage;
