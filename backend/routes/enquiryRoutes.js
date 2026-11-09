const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const { authenticateAdmin } = require('../middleware/auth');
const { enquiryRateLimiter } = require('../middleware/rateLimiter');

// Public route to submit enquiry with rate limiting
router.post('/', enquiryRateLimiter, enquiryController.createEnquiry);

// Protected Administrator routes
router.get('/', authenticateAdmin, enquiryController.getAllEnquiries);
router.get('/stats', authenticateAdmin, enquiryController.getEnquiryStats);
router.get('/:id', authenticateAdmin, enquiryController.getEnquiryById);
router.put('/:id', authenticateAdmin, enquiryController.updateEnquiry);
router.delete('/:id', authenticateAdmin, enquiryController.deleteEnquiry);

module.exports = router;
