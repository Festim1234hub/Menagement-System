const Task = require('../models/taskModel');

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
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

module.exports = { getTasks, createTask };
