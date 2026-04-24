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

module.exports = { getTasks };
