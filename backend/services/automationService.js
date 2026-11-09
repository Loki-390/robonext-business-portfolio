const db = require('../config/db');
const emailService = require('./emailService');

let automationInterval = null;
const activityLog = [];

function logActivity(action, details) {
  const entry = {
    id: Date.now() + Math.random().toString(36).substring(2, 6),
    timestamp: new Date().toISOString(),
    action,
    details
  };
  activityLog.unshift(entry);
  if (activityLog.length > 100) activityLog.pop();
  console.log(`[AUTOMATION LOG] [${entry.action}] ${JSON.stringify(details)}`);
  return entry;
}

// 1. Audit enquiries for follow-ups and reminders
async function runEnquiryAutomationAudit() {
  try {
    const results = {
      uncontactedFlagged: 0,
      upcomingDemosNotified: 0,
      timestamp: new Date().toISOString()
    };

    const enquiries = await db.query('SELECT * FROM school_enquiries ORDER BY created_at DESC');

    const now = new Date();

    for (const enq of enquiries) {
      // Rule 1: Flag 'New' enquiries older than 48 hours without notes
      if (enq.enquiry_status === 'New') {
        const created = new Date(enq.created_at);
        const diffHours = (now - created) / (1000 * 60 * 60);

        if (diffHours >= 48 && (!enq.internal_notes || !enq.internal_notes.includes('[Automated Reminder]'))) {
          const updatedNotes = (enq.internal_notes || '') + 
            `\n[Automated Reminder - ${now.toLocaleDateString()}]: Enquiry pending initial contact for >48h. Action required.`;
          
          await db.query(
            'UPDATE school_enquiries SET internal_notes = ? WHERE id = ?',
            [updatedNotes.trim(), enq.id]
          );
          results.uncontactedFlagged++;
          logActivity('FOLLOWUP_FLAG', { school: enq.school_name, id: enq.id, hoursPending: Math.round(diffHours) });
        }
      }

      // Rule 2: Upcoming Demos reminder (within 3 days)
      if (enq.enquiry_status === 'Demo Scheduled' && enq.preferred_date) {
        const demoDate = new Date(enq.preferred_date);
        const diffDays = Math.ceil((demoDate - now) / (1000 * 60 * 60 * 24));

        if (diffDays >= 0 && diffDays <= 3) {
          logActivity('UPCOMING_DEMO_ALERT', {
            school: enq.school_name,
            demoDate: enq.preferred_date,
            daysRemaining: diffDays,
            contactPerson: enq.contact_person,
            phone: enq.phone
          });
          results.upcomingDemosNotified++;
        }
      }
    }

    logActivity('AUDIT_COMPLETED', results);
    return results;
  } catch (err) {
    console.error('[Automation Audit Error]:', err.message);
    logActivity('AUDIT_ERROR', { error: err.message });
    throw err;
  }
}

// 2. Generate daily executive summary
async function generateDailyDigest() {
  try {
    const enquiries = await db.query('SELECT enquiry_status, COUNT(*) as count FROM school_enquiries GROUP BY enquiry_status');
    const totalResult = await db.query('SELECT COUNT(*) as count FROM school_enquiries');
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalEnquiries: totalResult[0]?.count || 0,
      breakdown: enquiries
    };

    logActivity('DAILY_DIGEST_GENERATED', summary);
    return summary;
  } catch (err) {
    console.error('[Daily Digest Error]:', err.message);
    throw err;
  }
}

// 3. Start automated interval worker
function startAutomationWorker(intervalHours = 12) {
  if (automationInterval) clearInterval(automationInterval);

  console.log(`[AUTOMATION] Background worker scheduled to run every ${intervalHours} hours.`);
  
  // Run once on launch after a brief delay
  setTimeout(() => {
    runEnquiryAutomationAudit().catch(e => console.error('[Initial Audit Error]:', e.message));
  }, 10000);

  automationInterval = setInterval(() => {
    runEnquiryAutomationAudit().catch(e => console.error('[Scheduled Audit Error]:', e.message));
  }, intervalHours * 60 * 60 * 1000);
}

function getAutomationLogs() {
  return activityLog;
}

module.exports = {
  runEnquiryAutomationAudit,
  generateDailyDigest,
  startAutomationWorker,
  getAutomationLogs,
  logActivity
};
