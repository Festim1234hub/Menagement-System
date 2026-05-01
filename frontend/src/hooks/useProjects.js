import { useState, useEffect, useCallback } from 'react';
import projectService from '../services/projectService';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectService.getAll();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (formData) => {
    const newProject = await projectService.create(formData);
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = async (id, formData) => {
    const updated = await projectService.update(id, formData);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  };

  const deleteProject = async (id) => {
    await projectService.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return { projects, loading, error, createProject, updateProject, deleteProject, refetch: fetchProjects };
};

export default useProjects;
