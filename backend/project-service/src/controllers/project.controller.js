const Project = require('../models/project.model');

const getProjects = async (req, res) => {
  try {
    const ownerId = req.query.owner_id;
    const projects = await Project.findAll(ownerId);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

const createProject = async (req, res) => {
  try {
    const { name, description, owner_id } = req.body;
    if (!name || !owner_id) {
      return res.status(400).json({ error: 'name and owner_id are required' });
    }
    const project = await Project.create({ name, description, owner_id });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

module.exports = { getProjects, createProject };
