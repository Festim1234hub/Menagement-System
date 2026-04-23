const Project = require('../models/project.model');
const redis = require('../config/redis');

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

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, status } = req.body;
    const existing = await Project.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }
    const updated = await Project.update(id, { name, description, status });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Project.findById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await Project.delete(id);
    await redis.del(`projects:${existing.owner_id}`);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
