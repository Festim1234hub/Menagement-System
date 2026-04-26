function ProjectCard({ project, onClick }) {
  const statusColors = {
    active: '#22d3ee',
    completed: '#4ade80',
    archived: '#94a3b8',
  };

  return (
    <div className="project-card" onClick={() => onClick(project)}>
      <div className="project-card-header">
        <h3 className="project-card-name">{project.name}</h3>
        <span
          className="project-card-status"
          style={{ color: statusColors[project.status] }}
        >
          {project.status}
        </span>
      </div>
      <p className="project-card-desc">{project.description || 'No description'}</p>
      <p className="project-card-date">
        Created: {new Date(project.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ProjectCard;
