const Task = require('../models/taskModel');
const { publishTaskEvent } = require('../config/rabbitmq');

const getTasks = async (req, res) => {
  try {
    const { project_id, status, priority } = req.query;
    if (!project_id) {
      return res.status(400).json({ error: 'project_id is required' });
    }
    const tasks = await Task.findByProject(project_id, { status, priority });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, project_id, assigned_to, priority, due_date } = req.body;
    if (!title || !project_id) {
      return res.status(400).json({ error: 'title and project_id are required' });
    }
    const task = await Task.create({ title, description, project_id, assigned_to, priority, due_date });
    publishTaskEvent("created", { text: `Task created: ${task.title}`, task });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, due_date } = req.body;
    const existing = await Task.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const updated = await Task.update(id, { title, description, status, priority, assigned_to, due_date });
    publishTaskEvent("updated", { text: `Task updated: ${updated.title}`, task: updated });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Task.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await Task.delete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
