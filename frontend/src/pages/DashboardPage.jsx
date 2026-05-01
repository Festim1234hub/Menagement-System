import { useState } from 'react';
import ProjectList from '../components/projects/ProjectList';
import Modal from '../components/shared/Modal';
import ProjectForm from '../components/projects/ProjectForm';
import useProjects from '../hooks/useProjects';
import useAuth from '../hooks/useAuth';

function DashboardPage({ onSelectProject }) {
  const { user } = useAuth();
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const isAdmin = user?.role === 'admin';
  const [showCreate, setShowCreate] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const handleCreate = async (data) => {
    await createProject(data);
    setShowCreate(false);
  };

  const handleUpdate = async (data) => {
    await updateProject(editProject.id, data);
    setEditProject(null);
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Delete "${project.name}"?`)) {
      await deleteProject(project.id);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h2 className="dashboard-title">{isAdmin ? 'All Projects' : 'My Projects'}</h2>
        <button className="btn-primary" onClick={() => setShowCreate(true)}>+ New Project</button>
      </div>

      {loading && <p className="empty-state">Loading projects...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && (
        <ProjectList
          projects={projects}
          onSelectProject={onSelectProject}
          onEditProject={setEditProject}
          onDeleteProject={handleDelete}
          showOwner={isAdmin}
        />
      )}

      {showCreate && (
        <Modal title="New Project" onClose={() => setShowCreate(false)}>
          <ProjectForm onSubmit={handleCreate} onCancel={() => setShowCreate(false)} />
        </Modal>
      )}
      {editProject && (
        <Modal title="Edit Project" onClose={() => setEditProject(null)}>
          <ProjectForm initial={editProject} onSubmit={handleUpdate} onCancel={() => setEditProject(null)} />
        </Modal>
      )}
    </div>
  );
}

export default DashboardPage;
