function ProjectCard({ project, onClick, onEdit, onDelete, showOwner }) {
  const statusColors = {
    active: '#22d3ee',
    completed: '#4ade80',
    archived: '#94a3b8',
  };

  return (
    <div className="project-card">
      <div className="project-card-header" onClick={() => onClick(project)}>
        <h3 className="project-card-name">{project.name}</h3>
        <span className="project-card-status" style={{ color: statusColors[project.status] }}>
          {project.status}
        </span>
      </div>
      <p className="project-card-desc" onClick={() => onClick(project)}>
        {project.description || 'No description'}
      </p>
      <div className="project-card-footer">
        <p className="project-card-date">
          {showOwner && project.owner_name && (
            <span style={{ color: '#6366f1', marginRight: '0.5rem' }}>👤 {project.owner_name} ·</span>
          )}
          Created: {new Date(project.created_at).toLocaleDateString()}
        </p>
        <div className="card-actions">
          <button
            className="btn-icon"
            onClick={(e) => { e.stopPropagation(); onEdit(project); }}
            title="Edit project"
          >
            ✏️
          </button>
          <button
            className="btn-icon btn-icon-danger"
            onClick={(e) => { e.stopPropagation(); onDelete(project); }}
            title="Delete project"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
