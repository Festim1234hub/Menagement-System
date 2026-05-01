import ProjectCard from './ProjectCard';

function ProjectList({ projects, onSelectProject, onEditProject, onDeleteProject, showOwner }) {
  if (!projects.length) {
    return <p className="empty-state">No projects yet. Create your first project!</p>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onSelectProject}
          onEdit={onEditProject}
          onDelete={onDeleteProject}
          showOwner={showOwner}
        />
      ))}
    </div>
  );
}

export default ProjectList;
