const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/project.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, getProjects);
router.post('/', verifyToken, createProject);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;
