const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateAdmin } = require('../middleware/auth');

// Public reads
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);

// Admin modifications
router.post('/', authenticateAdmin, projectController.createProject);
router.put('/:id', authenticateAdmin, projectController.updateProject);
router.delete('/:id', authenticateAdmin, projectController.deleteProject);

module.exports = router;
