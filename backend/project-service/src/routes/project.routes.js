const express = require('express');
const router = express.Router();
const { getProjects, createProject } = require('../controllers/project.controller');

router.get('/', getProjects);
router.post('/', createProject);

module.exports = router;
