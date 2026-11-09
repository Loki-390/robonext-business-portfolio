const Programme = require('../models/Programme');

// GET /api/programmes - Public gets active; Admin can get all
async function getAllProgrammes(req, res) {
  try {
    const isAdmin = Boolean(req.user);
    const status = isAdmin ? req.query.status : 'active';
    const programmes = await Programme.findAll({ status });
    return res.status(200).json({ success: true, count: programmes.length, data: programmes });
  } catch (err) {
    console.error('[Get Programmes Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve educational programmes.' });
  }
}

async function getProgrammeById(req, res) {
  try {
    const programme = await Programme.findById(req.params.id);
    if (!programme) {
      return res.status(404).json({ success: false, message: 'Programme not found.' });
    }
    return res.status(200).json({ success: true, data: programme });
  } catch (err) {
    console.error('[Get Programme By Id Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve programme details.' });
  }
}

async function createProgramme(req, res) {
  try {
    const { programme_name, target_classes, description, duration, learning_outcomes, topics, practical_activities, status } = req.body;

    if (!programme_name || !target_classes || !description) {
      return res.status(400).json({ success: false, message: 'Programme name, target classes, and description are required.' });
    }

    const created = await Programme.create({
      programme_name,
      target_classes,
      description,
      duration,
      learning_outcomes,
      topics,
      practical_activities,
      status: status || 'active'
    });

    return res.status(201).json({ success: true, message: 'Educational programme created successfully.', data: created });
  } catch (err) {
    console.error('[Create Programme Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to create programme.' });
  }
}

async function updateProgramme(req, res) {
  try {
    const updated = await Programme.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Programme not found.' });
    }
    return res.status(200).json({ success: true, message: 'Programme updated successfully.', data: updated });
  } catch (err) {
    console.error('[Update Programme Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update programme.' });
  }
}

async function deleteProgramme(req, res) {
  try {
    const deleted = await Programme.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Programme not found.' });
    }
    return res.status(200).json({ success: true, message: 'Programme removed successfully.' });
  } catch (err) {
    console.error('[Delete Programme Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete programme.' });
  }
}

module.exports = {
  getAllProgrammes,
  getProgrammeById,
  createProgramme,
  updateProgramme,
  deleteProgramme
};
