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

module.exports = { getProjects };
