const express = require('express');
const router = express.Router();
const automationController = require('../controllers/automationController');
const { authenticateAdmin } = require('../middleware/auth');

router.get('/overview', authenticateAdmin, automationController.getAutomationOverview);
router.post('/run-audit', authenticateAdmin, automationController.triggerAuditJob);
router.post('/trigger-digest', authenticateAdmin, automationController.triggerDigestJob);

module.exports = router;
