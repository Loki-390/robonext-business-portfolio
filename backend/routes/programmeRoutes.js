const express = require('express');
const router = express.Router();
const programmeController = require('../controllers/programmeController');
const { authenticateAdmin } = require('../middleware/auth');

// Public reads
router.get('/', programmeController.getAllProgrammes);
router.get('/:id', programmeController.getProgrammeById);

// Admin modifications
router.post('/', authenticateAdmin, programmeController.createProgramme);
router.put('/:id', authenticateAdmin, programmeController.updateProgramme);
router.delete('/:id', authenticateAdmin, programmeController.deleteProgramme);

module.exports = router;
