import { useState, useCallback } from 'react';
import taskService from '../services/taskService';

const useTasks = (projectId) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    if (!projectId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getByProject(projectId, filters);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createTask = async (formData) => {
    const newTask = await taskService.create({ ...formData, project_id: projectId });
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = async (id, formData) => {
    const updated = await taskService.update(id, formData);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  };

  const deleteTask = async (id) => {
    await taskService.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask };
};

export default useTasks;
