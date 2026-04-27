import { useState } from 'react';
import TaskList from '../components/tasks/TaskList';

const mockTasks = [
  { id: 1, title: 'Design homepage', description: 'Create mockups for the new homepage.', status: 'done', priority: 'high', due_date: '2024-04-01' },
  { id: 2, title: 'Setup API routes', description: 'Define all REST endpoints.', status: 'in_progress', priority: 'high', due_date: '2024-04-10' },
  { id: 3, title: 'Write unit tests', description: 'Cover core business logic.', status: 'todo', priority: 'medium', due_date: '2024-04-20' },
  { id: 4, title: 'Deploy to staging', description: 'Push latest build to staging server.', status: 'todo', priority: 'low', due_date: '2024-04-25' },
];

function TasksPage({ project, onBack }) {
  const [tasks] = useState(mockTasks);

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h2 className="tasks-title">{project ? project.name : 'Tasks'}</h2>
        <button className="btn-primary">+ New Task</button>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default TasksPage;
