import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Loader2, Calendar, MapPin, School, User, Mail, Phone, Users, BookOpen, Send } from 'lucide-react';
import api from '../services/api';

export default function DemoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    school_name: '',
    contact_person: '',
    designation: 'Principal',
    email: '',
    phone: '',
    location: '',
    classes_interested: 'Classes 6–8',
    student_strength: '',
    preferred_date: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/enquiries', formData);
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to connect to the server. Please verify your connection or call us directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
    setFormData({
      school_name: '',
      contact_person: '',
      designation: 'Principal',
      email: '',
      phone: '',
      location: '',
      classes_interested: 'Classes 6–8',
      student_strength: '',
      preferred_date: '',
      message: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200 animate-scaleUp">
        
        {/* Header */}
        <div className="bg-navy-900 px-6 py-5 text-white flex items-center justify-between border-b border-navy-800">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Free School Demonstration</span>
            <h3 className="text-xl font-bold mt-0.5">Schedule an Interactive Robotics Demo</h3>
            <p className="text-xs text-slate-300">100% Free &bull; No Obligation &bull; We bring all kits to your school</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-extrabold text-navy-900">Demonstration Request Submitted!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Thank you for inviting RoboNext STEM Technologies. We have logged your request in our system and sent an official acknowledgement email to <strong>{formData.email}</strong>.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto text-left text-xs text-blue-900 space-y-1">
                <p><strong>What happens next?</strong></p>
                <p>&bull; Our founder will contact you within 24 hours to confirm equipment and timing.</p>
                <p>&bull; We will arrive on your chosen date with working obstacle avoiders, line followers and kits.</p>
              </div>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => { resetForm(); onClose(); }}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1: School Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  School Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    name="school_name"
                    required
                    value={formData.school_name}
                    onChange={handleChange}
                    placeholder="e.g. St. Bede's Matriculation Hr Sec School"
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Contact Person & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Principal / Contact Person <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      name="contact_person"
                      required
                      value={formData.contact_person}
                      onChange={handleChange}
                      placeholder="e.g. Dr. R. Subramanian"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                  >
                    <option value="Principal">Principal</option>
                    <option value="Correspondent">Correspondent</option>
                    <option value="School Trustee / Management">School Trustee / Management</option>
                    <option value="Academic Coordinator">Academic Coordinator</option>
                    <option value="Science Department Head">Science Department Head</option>
                    <option value="Computer Science Head">Computer Science Head</option>
                    <option value="Other">Other Representative</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Official Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. principal@school.edu.in"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98401 23456"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: School Location & Classes Interested */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    School Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Velachery / Adyar, Chennai"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Classes Interested In
                  </label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <select
                      name="classes_interested"
                      value={formData.classes_interested}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                    >
                      <option value="Classes 6–7">Classes 6–7 (Foundation)</option>
                      <option value="Classes 6–8">Classes 6–8 (Recommended)</option>
                      <option value="Classes 8–9">Classes 8–9 (Advanced / IoT)</option>
                      <option value="Classes 6–9 (Entire Middle/High School)">Classes 6–9 (All)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Expected Student Strength & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Estimated Student Strength
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="number"
                      name="student_strength"
                      value={formData.student_strength}
                      onChange={handleChange}
                      placeholder="e.g. 80"
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Preferred Demonstration Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 6: Additional Message / Specific Requirements */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Additional Information or School Schedule Preferences
                </label>
                <textarea
                  name="message"
                  rows={2}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="e.g. Preferred time during assembly or afternoon activity hour. Would like to see the obstacle avoider live."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Demonstration Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Request a Free Demonstration</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  🔒 Strictly confidential. No marketing spam. Completely free with zero obligation to purchase.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
