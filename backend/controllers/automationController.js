const { runEnquiryAutomationAudit, generateDailyDigest, getAutomationLogs } = require('../services/automationService');
const { getDbStatus } = require('../config/db');

async function getAutomationOverview(req, res) {
  try {
    const logs = getAutomationLogs();
    const dbStatus = getDbStatus();

    return res.status(200).json({
      success: true,
      system: {
        uptime: process.uptime(),
        database: dbStatus,
        smtpConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
      },
      logs
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve automation overview.' });
  }
}

async function triggerAuditJob(req, res) {
  try {
    const result = await runEnquiryAutomationAudit();
    return res.status(200).json({
      success: true,
      message: 'Automated enquiry pipeline audit completed successfully.',
      result
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Automated audit job failed.', error: err.message });
  }
}

async function triggerDigestJob(req, res) {
  try {
    const digest = await generateDailyDigest();
    return res.status(200).json({
      success: true,
      message: 'Automated executive digest compiled.',
      digest
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Digest generation failed.', error: err.message });
  }
}

module.exports = {
  getAutomationOverview,
  triggerAuditJob,
  triggerDigestJob
};
