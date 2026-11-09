import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  BookOpen, 
  X, 
  Save, 
  RefreshCw,
  Loader2
} from 'lucide-react';
import api from '../services/api';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Edit form state
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await api.get('/enquiries', { params });
      if (res.data.success) {
        setEnquiries(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const openViewModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.enquiry_status);
    setEditNotes(enquiry.internal_notes || '');
    setEditModal(true);
  };

  const handleSaveStatusAndNotes = async () => {
    if (!selectedEnquiry) return;
    setActionLoading(true);

    try {
      const res = await api.put(`/enquiries/${selectedEnquiry.id}`, {
        enquiry_status: editStatus,
        internal_notes: editNotes
      });

      if (res.data.success) {
        setEnquiries(enquiries.map(e => e.id === selectedEnquiry.id ? res.data.data : e));
        setSelectedEnquiry(res.data.data);
        setEditModal(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update enquiry.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id, schoolName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the enquiry record for "${schoolName}"?`)) {
      return;
    }

    try {
      const res = await api.delete(`/enquiries/${id}`);
      if (res.data.success) {
        setEnquiries(enquiries.filter(e => e.id !== id));
        if (selectedEnquiry?.id === id) {
          setEditModal(false);
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete record.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Demo Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Demo Completed': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Proposal Sent': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Partnership Confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Closed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const statuses = [
    'all',
    'New',
    'Contacted',
    'Demo Scheduled',
    'Demo Completed',
    'Proposal Sent',
    'Partnership Confirmed',
    'Closed'
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            School Demonstration Enquiries
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review incoming school inquiries, schedule free robotics demonstrations, and update partnership statuses.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reload Table</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search school, contact, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </form>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 sm:pb-0 scrollbar-none">
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-navy-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">School & Location</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Target Classes</th>
                <th className="py-3.5 px-4">Requested Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
                    <span>Loading enquiries...</span>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-500">
                    No matching school enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <strong className="block font-bold text-navy-900 text-sm">{enq.school_name}</strong>
                      <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        {enq.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{enq.contact_person}</span>
                      <span className="text-slate-500 text-[11px] block">{enq.designation}</span>
                      <a href={`tel:${enq.phone}`} className="text-blue-600 hover:underline text-[11px] block">
                        {enq.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="block font-medium text-slate-800">{enq.classes_interested || 'Classes 6–9'}</span>
                      <span className="text-slate-400 text-[11px]">
                        {enq.student_strength ? `${enq.student_strength} students` : 'Strength flexible'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono text-slate-700 block">
                        {enq.preferred_date ? new Date(enq.preferred_date).toLocaleDateString() : 'Flexible'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Received {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(enq.enquiry_status)}`}>
                        {enq.enquiry_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openViewModal(enq)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View & Edit Status"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(enq.id, enq.school_name)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View & Update Modal */}
      {editModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto border border-slate-200">
            
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Enquiry ID #{selectedEnquiry.id}</span>
                <h3 className="text-xl font-bold text-navy-900 mt-0.5">{selectedEnquiry.school_name}</h3>
              </div>
              <button onClick={() => setEditModal(false)} className="p-1 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* School Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Contact Person:</strong>
                <span className="font-semibold text-slate-900">{selectedEnquiry.contact_person} ({selectedEnquiry.designation})</span>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Location:</strong>
                <span className="font-semibold text-slate-900">{selectedEnquiry.location}</span>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Official Email:</strong>
                <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline">{selectedEnquiry.email}</a>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Phone:</strong>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 hover:underline">{selectedEnquiry.phone}</a>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Target Classes:</strong>
                <span className="font-semibold text-slate-900">{selectedEnquiry.classes_interested || 'Classes 6–9'}</span>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Expected Student Strength:</strong>
                <span className="font-semibold text-slate-900">{selectedEnquiry.student_strength || 'Not specified'}</span>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Preferred Demonstration Date:</strong>
                <span className="font-semibold text-slate-900">
                  {selectedEnquiry.preferred_date ? new Date(selectedEnquiry.preferred_date).toLocaleDateString() : 'Flexible'}
                </span>
              </div>
              <div>
                <strong className="text-slate-500 block uppercase text-[10px]">Submitted At:</strong>
                <span className="font-semibold text-slate-900">{new Date(selectedEnquiry.created_at).toLocaleString()}</span>
              </div>
            </div>

            {/* School Message */}
            {selectedEnquiry.message && (
              <div className="text-xs space-y-1">
                <strong className="text-slate-600 uppercase text-[10px] block">Additional Notes from School:</strong>
                <p className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg text-slate-700 leading-relaxed italic">
                  "{selectedEnquiry.message}"
                </p>
              </div>
            )}

            {/* Update Status & Internal Notes Form */}
            <div className="space-y-4 pt-2 border-t border-slate-200 text-xs">
              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Update Enquiry Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Demo Scheduled">Demo Scheduled</option>
                  <option value="Demo Completed">Demo Completed</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Partnership Confirmed">Partnership Confirmed</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Internal Administrative Notes
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record call summaries, principal feedback, preferred robot models, or next action items..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.school_name)}
                className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditModal(false)}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStatusAndNotes}
                  disabled={actionLoading}
                  className="btn-primary text-xs py-2 px-5 flex items-center gap-1.5 font-bold"
                >
                  {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
