function TaskCard({ task, onEdit, onDelete, users = [] }) {
  const assignedUser = users.find((u) => String(u.id) === String(task.assigned_to));
  const priorityColors = {
    low: '#4ade80',
    medium: '#facc15',
    high: '#f87171',
  };

  const statusLabels = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-card-title">{task.title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="task-card-priority" style={{ color: priorityColors[task.priority] }}>
            {task.priority}
          </span>
          <button className="btn-icon" onClick={() => onEdit(task)} title="Edit task">✏️</button>
          <button className="btn-icon btn-icon-danger" onClick={() => onDelete(task)} title="Delete task">🗑️</button>
        </div>
      </div>
      {task.description && <p className="task-card-desc">{task.description}</p>}
      {assignedUser && (
        <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: '#6366f1' }}>
          👤 {assignedUser.name}
        </p>
      )}
      <div className="task-card-footer">
        <span className="task-card-status">{statusLabels[task.status] || task.status}</span>
        {task.due_date && (
          <span className="task-card-due">Due: {task.due_date.split('T')[0]}</span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
