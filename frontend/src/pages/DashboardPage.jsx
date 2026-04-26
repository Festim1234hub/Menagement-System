import { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';

const mockProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign the company website with new branding.',
    status: 'active',
    created_at: '2024-01-15',
  },
  {
    id: 2,
    name: 'Mobile App',
    description: 'Build the iOS and Android app for customers.',
    status: 'active',
    created_at: '2024-02-10',
  },
  {
    id: 3,
    name: 'API Integration',
    description: 'Integrate third-party payment and analytics APIs.',
    status: 'completed',
    created_at: '2024-03-01',
  },
];

function DashboardPage({ onSelectProject }) {
  const [projects] = useState(mockProjects);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">My Projects</h2>
        <button className="btn-primary">+ New Project</button>
      </div>
      <ProjectList projects={projects} onSelectProject={onSelectProject} />
    </div>
  );
}

export default DashboardPage;
