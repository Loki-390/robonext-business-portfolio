import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Loader2, 
  Eye, 
  EyeOff, 
  Cpu, 
  Video,
  Sparkles
} from 'lucide-react';
import api from '../services/api';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    project_name: '',
    category: 'Autonomous Robotics',
    description: '',
    technologies: '',
    working_principle: '',
    learning_outcomes: '',
    image_url: '/images/projects/obstacle-avoider.jpg',
    video_url: '',
    status: 'published'
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      if (res.data.success) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      project_name: '',
      category: 'Autonomous Robotics',
      description: '',
      technologies: 'Arduino Uno, Sensors, Motor Driver',
      working_principle: '',
      learning_outcomes: '',
      image_url: '/images/projects/obstacle-avoider.jpg',
      video_url: '',
      status: 'published'
    });
    setModalOpen(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      project_name: proj.project_name || '',
      category: proj.category || 'Autonomous Robotics',
      description: proj.description || '',
      technologies: proj.technologies || '',
      working_principle: proj.working_principle || '',
      learning_outcomes: proj.learning_outcomes || '',
      image_url: proj.image_url || '',
      video_url: proj.video_url || '',
      status: proj.status || 'published'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProject) {
        const res = await api.put(`/projects/${editingProject.id}`, formData);
        if (res.data.success) {
          setProjects(projects.map(p => p.id === editingProject.id ? res.data.data : p));
        }
      } else {
        const res = await api.post('/projects', formData);
        if (res.data.success) {
          setProjects([...projects, res.data.data]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (proj) => {
    const nextStatus = proj.status === 'published' ? 'draft' : 'published';
    try {
      const res = await api.put(`/projects/${proj.id}`, { status: nextStatus });
      if (res.data.success) {
        setProjects(projects.map(p => p.id === proj.id ? { ...p, status: nextStatus } : p));
      }
    } catch (err) {
      alert('Failed to update project status.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from portfolio?`)) return;

    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data.success) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Hardware Project Portfolio Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showcase working robotic creations, sensors, working principles, and video demonstrations to schools.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-12 text-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            <span>Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-3 bg-white p-12 text-center rounded-2xl border text-slate-500">
            No projects found.
          </div>
        ) : (
          projects.map((proj) => (
            <div 
              key={proj.id}
              className={`p-6 bg-white border rounded-2xl shadow-sm flex flex-col justify-between space-y-4 ${
                proj.status === 'draft' ? 'opacity-60 border-dashed border-slate-300' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    proj.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {proj.status}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-bold text-base text-navy-900">{proj.project_name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{proj.description}</p>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <p className="line-clamp-2"><strong>Tech:</strong> {proj.technologies}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(proj)}
                  className="text-xs font-semibold text-slate-500 hover:text-navy-900 flex items-center gap-1"
                >
                  {proj.status === 'published' ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Unpublish</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Publish</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id, proj.project_name)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[92vh] overflow-y-auto border border-slate-200 text-xs">
            
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-navy-900">
                {editingProject ? 'Edit Hardware Project' : 'Add New Hardware Creation'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  placeholder="e.g. Ultrasonic Obstacle Avoider"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Autonomous Robotics">Autonomous Robotics</option>
                  <option value="Sensor Robotics">Sensor Robotics</option>
                  <option value="Wireless Systems">Wireless Systems</option>
                  <option value="Smart Automation">Smart Automation</option>
                  <option value="IoT & Agriculture">IoT & Agriculture</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technologies & Components</label>
                <input
                  type="text"
                  required
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Arduino Uno, HC-SR04, L298N Motor Driver, DC Motors"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Clear description of the robotic creation..."
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Working Principle & Physics</label>
                <textarea
                  rows={2}
                  required
                  value={formData.working_principle}
                  onChange={(e) => setFormData({ ...formData, working_principle: e.target.value })}
                  placeholder="How does it work? Ultrasonic echo duration, IR reflection..."
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Student Learning Outcomes</label>
                <textarea
                  rows={2}
                  required
                  value={formData.learning_outcomes}
                  onChange={(e) => setFormData({ ...formData, learning_outcomes: e.target.value })}
                  placeholder="Sensor calibration, feedback loops, real-world troubleshooting..."
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary text-xs py-2 px-5 font-bold"
                >
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Project'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
