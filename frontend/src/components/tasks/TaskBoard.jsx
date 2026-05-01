import { useState, useRef } from 'react';

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

const priorityColors = {
  low: '#4ade80',
  medium: '#facc15',
  high: '#f87171',
};

function TaskBoard({ tasks, onStatusChange, onEditTask, onDeleteTask, users = [] }) {
  const [dragOverCol, setDragOverCol] = useState(null);
  const draggedId = useRef(null);

  const handleDragStart = (taskId) => {
    draggedId.current = taskId;
  };

  const handleDrop = (colId) => {
    if (draggedId.current !== null) {
      onStatusChange(draggedId.current, colId);
      draggedId.current = null;
    }
    setDragOverCol(null);
  };

  return (
    <div className="task-board">
      {COLUMNS.map((col) => (
        <div
          key={col.id}
          className={`board-column ${dragOverCol === col.id ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
          onDragLeave={() => setDragOverCol(null)}
          onDrop={() => handleDrop(col.id)}
        >
          <h3 className="board-column-title">{col.label}</h3>
          <div className="board-column-tasks">
            {tasks
              .filter((t) => t.status === col.id)
              .map((task) => (
                <div
                  key={task.id}
                  className="board-task-card"
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                >
                  <div className="board-task-info">
                    <span className="board-task-title">{task.title}</span>
                    <span className="board-task-priority" style={{ color: priorityColors[task.priority] }}>
                      {task.priority}
                    </span>
                    {(() => {
                      const u = users.find((u) => String(u.id) === String(task.assigned_to));
                      return u ? <span style={{ fontSize: '0.73rem', color: '#6366f1' }}>👤 {u.name}</span> : null;
                    })()}
                  </div>
                  <div className="board-task-btns">
                    <button
                      className="btn-icon btn-icon-sm"
                      onClick={(e) => { e.stopPropagation(); onEditTask(task); }}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-icon-sm btn-icon-danger"
                      onClick={(e) => { e.stopPropagation(); onDeleteTask(task); }}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
