import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Check, 
  Loader2, 
  Clock, 
  Users,
  Eye,
  EyeOff
} from 'lucide-react';
import api from '../services/api';

export default function ProgrammesManager() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingProg, setEditingProg] = useState(null);

  const [formData, setFormData] = useState({
    programme_name: '',
    target_classes: 'Classes 6–7',
    description: '',
    duration: '',
    topics: '',
    practical_activities: '',
    learning_outcomes: '',
    status: 'active'
  });

  const fetchProgrammes = async () => {
    try {
      setLoading(true);
      const res = await api.get('/programmes');
      if (res.data.success) {
        setProgrammes(res.data.data);
      }
    } catch (err) {
      console.error('Failed to load programmes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammes();
  }, []);

  const openAddModal = () => {
    setEditingProg(null);
    setFormData({
      programme_name: '',
      target_classes: 'Classes 6–7',
      description: '',
      duration: '4 Weeks (8 Sessions)',
      topics: '',
      practical_activities: '',
      learning_outcomes: '',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (prog) => {
    setEditingProg(prog);
    setFormData({
      programme_name: prog.programme_name || '',
      target_classes: prog.target_classes || '',
      description: prog.description || '',
      duration: prog.duration || '',
      topics: prog.topics || '',
      practical_activities: prog.practical_activities || '',
      learning_outcomes: prog.learning_outcomes || '',
      status: prog.status || 'active'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingProg) {
        const res = await api.put(`/programmes/${editingProg.id}`, formData);
        if (res.data.success) {
          setProgrammes(programmes.map(p => p.id === editingProg.id ? res.data.data : p));
        }
      } else {
        const res = await api.post('/programmes', formData);
        if (res.data.success) {
          setProgrammes([...programmes, res.data.data]);
        }
      }
      setModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save programme.');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (prog) => {
    const nextStatus = prog.status === 'active' ? 'inactive' : 'active';
    try {
      const res = await api.put(`/programmes/${prog.id}`, { status: nextStatus });
      if (res.data.success) {
        setProgrammes(programmes.map(p => p.id === prog.id ? { ...p, status: nextStatus } : p));
      }
    } catch (err) {
      alert('Failed to update programme status.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" from curriculum?`)) return;

    try {
      const res = await api.delete(`/programmes/${id}`);
      if (res.data.success) {
        setProgrammes(programmes.filter(p => p.id !== id));
      }
    } catch (err) {
      alert('Failed to delete programme.');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Curriculum & Programme Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Maintain structured robotics and STEM learning courses visible to school coordinators.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="btn-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Programme</span>
        </button>
      </div>

      {/* Grid of Programmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
            <span>Loading courses...</span>
          </div>
        ) : programmes.length === 0 ? (
          <div className="col-span-2 bg-white p-12 text-center rounded-2xl border text-slate-500">
            No programmes found. Click "Add New Programme" to create one.
          </div>
        ) : (
          programmes.map((prog) => (
            <div 
              key={prog.id}
              className={`p-6 bg-white border rounded-2xl shadow-sm space-y-4 flex flex-col justify-between ${
                prog.status === 'inactive' ? 'opacity-60 border-dashed border-slate-300' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    prog.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {prog.status}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {prog.target_classes}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-navy-900">{prog.programme_name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{prog.description}</p>

                <div className="pt-2 text-xs text-slate-500 space-y-1">
                  <p><strong>Duration:</strong> {prog.duration || 'Not set'}</p>
                  <p className="line-clamp-2"><strong>Topics:</strong> {prog.topics || 'None listed'}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(prog)}
                  className="text-xs font-semibold text-slate-500 hover:text-navy-900 flex items-center gap-1"
                >
                  {prog.status === 'active' ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Deactivate</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Activate</span>
                    </>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(prog)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id, prog.programme_name)}
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
                {editingProg ? 'Edit Educational Programme' : 'Add New Programme'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Programme Name</label>
                <input
                  type="text"
                  required
                  value={formData.programme_name}
                  onChange={(e) => setFormData({ ...formData, programme_name: e.target.value })}
                  placeholder="e.g. Practical Robotics Series"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Classes</label>
                  <input
                    type="text"
                    required
                    value={formData.target_classes}
                    onChange={(e) => setFormData({ ...formData, target_classes: e.target.value })}
                    placeholder="Classes 6–8"
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration / Sessions</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="6 Weeks (12 Sessions)"
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of syllabus and goals..."
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topics (comma separated)</label>
                <input
                  type="text"
                  value={formData.topics}
                  onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                  placeholder="Arduino Introduction, IR Sensors, Ultrasonic Sensors, Motors"
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Practical Activities</label>
                <textarea
                  rows={2}
                  value={formData.practical_activities}
                  onChange={(e) => setFormData({ ...formData, practical_activities: e.target.value })}
                  placeholder="Assembling chassis, wiring motor driver, programming logic..."
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Learning Outcomes</label>
                <textarea
                  rows={2}
                  value={formData.learning_outcomes}
                  onChange={(e) => setFormData({ ...formData, learning_outcomes: e.target.value })}
                  placeholder="Sensor feedback understanding, algorithmic logic..."
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
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save Programme'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
