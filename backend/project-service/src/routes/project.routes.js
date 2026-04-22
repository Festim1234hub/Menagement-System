const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject } = require('../controllers/project.controller');

router.get('/', getProjects);
router.post('/', createProject);
router.put('/:id', updateProject);

module.exports = router;
