const Enquiry = require('../models/Enquiry');
const { sendSchoolAcknowledgementEmail, sendAdminNotificationEmail } = require('../services/emailService');
const { logActivity } = require('../services/automationService');

// POST /api/enquiries - Public submission
async function createEnquiry(req, res) {
  try {
    const {
      school_name,
      contact_person,
      designation,
      email,
      phone,
      location,
      classes_interested,
      student_strength,
      preferred_date,
      message
    } = req.body;

    // Strict validation
    if (!school_name || !school_name.trim()) {
      return res.status(400).json({ success: false, message: 'School name is required.' });
    }
    if (!contact_person || !contact_person.trim()) {
      return res.status(400).json({ success: false, message: 'Contact person / Principal name is required.' });
    }
    if (!designation || !designation.trim()) {
      return res.status(400).json({ success: false, message: 'Designation is required.' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid official email address is required.' });
    }
    if (!phone || !phone.trim() || phone.trim().length < 7) {
      return res.status(400).json({ success: false, message: 'A valid contact phone number is required.' });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ success: false, message: 'School location is required.' });
    }

    const newEnquiry = await Enquiry.create({
      school_name: school_name.trim(),
      contact_person: contact_person.trim(),
      designation: designation.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location: location.trim(),
      classes_interested: classes_interested ? classes_interested.trim() : null,
      student_strength: student_strength ? Number(student_strength) : null,
      preferred_date: preferred_date || null,
      message: message ? message.trim() : null,
      enquiry_status: 'New',
      internal_notes: `Initial submission received via website on ${new Date().toLocaleDateString()}.`
    });

    logActivity('NEW_ENQUIRY', {
      id: newEnquiry.id,
      school: newEnquiry.school_name,
      contact: newEnquiry.contact_person
    });

    // Asynchronously dispatch notifications without blocking user response
    sendSchoolAcknowledgementEmail(newEnquiry).catch(err => {
      console.error('[Email Warning] Failed to send school acknowledgement:', err.message);
    });

    sendAdminNotificationEmail(newEnquiry).catch(err => {
      console.error('[Email Warning] Failed to send admin notification:', err.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Demonstration request submitted successfully! An acknowledgement email has been dispatched to your official address.',
      enquiryId: newEnquiry.id
    });
  } catch (err) {
    console.error('[Create Enquiry Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit demonstration request. Please try again or reach out to us directly.'
    });
  }
}

// GET /api/enquiries - Admin only
async function getAllEnquiries(req, res) {
  try {
    const { status, search } = req.query;
    const enquiries = await Enquiry.findAll({ status, search });
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries
    });
  } catch (err) {
    console.error('[Get All Enquiries Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries.'
    });
  }
}

// GET /api/enquiries/stats - Admin only
async function getEnquiryStats(req, res) {
  try {
    const stats = await Enquiry.getStats();
    return res.status(200).json({
      success: true,
      stats
    });
  } catch (err) {
    console.error('[Get Stats Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate enquiry statistics.'
    });
  }
}

// GET /api/enquiries/:id - Admin only
async function getEnquiryById(req, res) {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    return res.status(200).json({ success: true, data: enquiry });
  } catch (err) {
    console.error('[Get Enquiry By ID Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch enquiry.' });
  }
}

// PUT /api/enquiries/:id - Admin only
async function updateEnquiry(req, res) {
  try {
    const { id } = req.params;
    const { enquiry_status, internal_notes } = req.body;

    const validStatuses = [
      'New',
      'Contacted',
      'Demo Scheduled',
      'Demo Completed',
      'Proposal Sent',
      'Partnership Confirmed',
      'Closed'
    ];

    if (enquiry_status && !validStatuses.includes(enquiry_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const updated = await Enquiry.update(id, { enquiry_status, internal_notes });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Enquiry record not found.' });
    }

    logActivity('STATUS_UPDATE', { id, status: enquiry_status, updatedBy: req.user?.username });

    return res.status(200).json({
      success: true,
      message: 'Enquiry status and notes updated successfully.',
      data: updated
    });
  } catch (err) {
    console.error('[Update Enquiry Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update enquiry.' });
  }
}

// DELETE /api/enquiries/:id - Admin only
async function deleteEnquiry(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Enquiry.delete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    logActivity('DELETE_ENQUIRY', { id, deletedBy: req.user?.username });

    return res.status(200).json({
      success: true,
      message: 'School enquiry record deleted permanently.'
    });
  } catch (err) {
    console.error('[Delete Enquiry Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete enquiry.' });
  }
}

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getEnquiryStats,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry
};
