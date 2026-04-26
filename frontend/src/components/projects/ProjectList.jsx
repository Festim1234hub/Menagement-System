import ProjectCard from './ProjectCard';

function ProjectList({ projects, onSelectProject }) {
  if (!projects.length) {
    return <p className="empty-state">No projects yet. Create your first project!</p>;
  }

  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={onSelectProject} />
      ))}
    </div>
  );
}

export default ProjectList;
