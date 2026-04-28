import { useState, useRef } from 'react';

const COLUMNS = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

function TaskBoard({ tasks, onStatusChange }) {
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
                  <span className="board-task-title">{task.title}</span>
                  <span className={`board-task-priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;
