const Project = require('../models/Project');

// GET /api/projects - Public gets published; Admin gets all or filtered
async function getAllProjects(req, res) {
  try {
    const isAdmin = Boolean(req.user);
    const status = isAdmin ? req.query.status : 'published';
    const projects = await Project.findAll({ status });
    return res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error('[Get Projects Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve project portfolio.' });
  }
}

async function getProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    console.error('[Get Project By Id Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve project details.' });
  }
}

async function createProject(req, res) {
  try {
    const { project_name, description, technologies, working_principle, learning_outcomes, image_url, video_url, category, status } = req.body;

    if (!project_name || !description || !technologies || !working_principle || !learning_outcomes) {
      return res.status(400).json({
        success: false,
        message: 'Project name, description, technologies, working principle, and learning outcomes are required.'
      });
    }

    const created = await Project.create({
      project_name,
      description,
      technologies,
      working_principle,
      learning_outcomes,
      image_url: image_url || '/images/projects/obstacle-avoider.jpg',
      video_url: video_url || '',
      category: category || 'Robotics',
      status: status || 'published'
    });

    return res.status(201).json({ success: true, message: 'Project added to portfolio successfully.', data: created });
  } catch (err) {
    console.error('[Create Project Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to create project.' });
  }
}

async function updateProject(req, res) {
  try {
    const updated = await Project.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, message: 'Project portfolio item updated successfully.', data: updated });
  } catch (err) {
    console.error('[Update Project Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to update project.' });
  }
}

async function deleteProject(req, res) {
  try {
    const deleted = await Project.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found.' });
    }
    return res.status(200).json({ success: true, message: 'Project removed successfully.' });
  } catch (err) {
    console.error('[Delete Project Error]:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete project.' });
  }
}

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
