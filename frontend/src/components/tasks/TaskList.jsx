import TaskCard from './TaskCard';

function TaskList({ tasks, onEditTask, onDeleteTask, users = [] }) {
  if (!tasks.length) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} users={users} />
      ))}
    </div>
  );
}

export default TaskList;
