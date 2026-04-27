function TaskCard({ task }) {
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
        <span
          className="task-card-priority"
          style={{ color: priorityColors[task.priority] }}
        >
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}
      <div className="task-card-footer">
        <span className="task-card-status">{statusLabels[task.status]}</span>
        {task.due_date && (
          <span className="task-card-due">Due: {task.due_date}</span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
