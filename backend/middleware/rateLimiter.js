const rateLimit = require('express-rate-limit');

// Rate limiter for public enquiry submissions (e.g., max 10 requests per 15 minutes per IP)
const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many demonstration requests submitted from this IP address. Please wait 15 minutes before submitting again.'
  }
});

// General API rate limiter
const generalApiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'API rate limit exceeded. Please try again shortly.'
  }
});

module.exports = {
  enquiryRateLimiter,
  generalApiLimiter
};
