const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const hasCredentials = process.env.SMTP_USER && process.env.SMTP_PASS;

  if (hasCredentials) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else {
    // Development / Simulation transporter
    transporter = {
      sendMail: async (mailOptions) => {
        const logEntry = `\n[${new Date().toISOString()}] EMAIL DISPATCHED\n` +
          `TO: ${mailOptions.to}\n` +
          `SUBJECT: ${mailOptions.subject}\n` +
          `BODY:\n${mailOptions.text || mailOptions.html.replace(/<[^>]*>/g, ' ')}\n` +
          `------------------------------------------------------------\n`;
        
        console.log(`[EMAIL DISPATCH SIMULATOR] To: ${mailOptions.to} | Subject: "${mailOptions.subject}"`);
        
        const logsDir = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(logsDir)) {
          fs.mkdirSync(logsDir, { recursive: true });
        }
        fs.appendFileSync(path.join(logsDir, 'outbox.log'), logEntry, 'utf8');
        return { messageId: 'simulated-' + Date.now() };
      }
    };
  }
  return transporter;
}

// 1. Send acknowledgement email to school
async function sendSchoolAcknowledgementEmail(enquiry) {
  const mailer = getTransporter();
  const from = process.env.EMAIL_FROM || '"RoboNext STEM Technologies" <enquiries@robonext.com>';

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
      .header { background: #0A192F; color: #ffffff; padding: 32px 24px; text-align: center; }
      .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
      .header p { margin: 6px 0 0; color: #94a3b8; font-size: 14px; }
      .content { padding: 32px 24px; line-height: 1.6; font-size: 15px; }
      .highlight-box { background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; margin: 20px 0; }
      .summary-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
      .summary-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
      .summary-table td:first-child { font-weight: 600; color: #64748b; width: 40%; }
      .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
      .btn { display: inline-block; background: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 10px; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>ROBONEXT STEM TECHNOLOGIES</h1>
        <p>Practical Robotics, IoT & STEM Education Partner for Schools</p>
      </div>
      <div class="content">
        <p>Dear <strong>${enquiry.contact_person || 'Principal / Academic Coordinator'}</strong>,</p>
        <p>Thank you for your interest in our practical Robotics and STEM Education programmes at <strong>${enquiry.school_name}</strong>.</p>
        
        <div class="highlight-box">
          <strong>Next Steps:</strong> We have successfully received your enquiry and our founder will personally review your preferences to arrange a <em>Free Introductory Demonstration Session</em> at your school premises.
        </div>

        <p>Here is a summary of the details submitted:</p>
        <table class="summary-table">
          <tr><td>School Name:</td><td>${enquiry.school_name}</td></tr>
          <tr><td>Designation:</td><td>${enquiry.designation || 'Not specified'}</td></tr>
          <tr><td>Location:</td><td>${enquiry.location}</td></tr>
          <tr><td>Classes Interested:</td><td>${enquiry.classes_interested || 'Classes 6–9'}</td></tr>
          <tr><td>Student Strength:</td><td>${enquiry.student_strength ? enquiry.student_strength + ' students' : 'Flexible'}</td></tr>
          <tr><td>Preferred Date:</td><td>${enquiry.preferred_date || 'Flexible'}</td></tr>
        </table>

        <p>During the free demonstration, students and management will experience live working robots (including obstacle avoiders and line followers), practical sensor demonstrations, and our structured five-stage learning methodology.</p>

        <p>There is absolutely <strong>no obligation or purchase requirement</strong> for this demonstration session.</p>

        <p>Warm regards,<br>
        <strong>RoboNext STEM Technologies Team</strong><br>
        Chennai, Tamil Nadu<br>
        Contact: enquiries@robonext.com
        </p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} RoboNext STEM Technologies. All rights reserved.<br>
        Velachery &bull; Taramani &bull; Perungudi &bull; OMR &bull; Chennai
      </div>
    </div>
  </body>
  </html>
  `;

  return mailer.sendMail({
    from,
    to: enquiry.email,
    subject: `Enquiry Acknowledgement: Robotics & STEM Demonstration for ${enquiry.school_name}`,
    html
  });
}

// 2. Send notification email to admin
async function sendAdminNotificationEmail(enquiry) {
  const mailer = getTransporter();
  const from = process.env.EMAIL_FROM || '"RoboNext System" <system@robonext.com>';
  const to = process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@robonext.com';

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 20px; color: #0f172a; }
      .container { max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 24px; }
      h2 { color: #1e3a8a; margin-top: 0; }
      .badge { display: inline-block; background: #dbeafe; color: #1d4ed8; font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
      .data-row { margin: 8px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
      .label { font-weight: 600; color: #475569; width: 140px; display: inline-block; }
      .btn { display: inline-block; margin-top: 16px; background: #0284c7; color: #fff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>🚀 New School Demo Request Received</h2>
      <p><span class="badge">STATUS: NEW ENQUIRY</span></p>

      <div class="data-row"><span class="label">School:</span> <strong>${enquiry.school_name}</strong></div>
      <div class="data-row"><span class="label">Contact Person:</span> ${enquiry.contact_person} (${enquiry.designation})</div>
      <div class="data-row"><span class="label">Official Email:</span> <a href="mailto:${enquiry.email}">${enquiry.email}</a></div>
      <div class="data-row"><span class="label">Contact Phone:</span> <a href="tel:${enquiry.phone}">${enquiry.phone}</a></div>
      <div class="data-row"><span class="label">School Location:</span> ${enquiry.location}</div>
      <div class="data-row"><span class="label">Target Classes:</span> ${enquiry.classes_interested || 'N/A'}</div>
      <div class="data-row"><span class="label">Student Strength:</span> ${enquiry.student_strength || 'N/A'}</div>
      <div class="data-row"><span class="label">Preferred Date:</span> ${enquiry.preferred_date || 'Flexible'}</div>
      <div class="data-row"><span class="label">Message / Notes:</span> ${enquiry.message || 'None provided'}</div>

      <p><a href="http://localhost:5173/admin/enquiries" class="btn">Open Admin Dashboard</a></p>
    </div>
  </body>
  </html>
  `;

  return mailer.sendMail({
    from,
    to,
    subject: `🚨 New School Demonstration Request: ${enquiry.school_name}`,
    html
  });
}

module.exports = {
  sendSchoolAcknowledgementEmail,
  sendAdminNotificationEmail
};
