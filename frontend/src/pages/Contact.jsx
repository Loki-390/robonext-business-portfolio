import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  School, 
  User, 
  Users, 
  BookOpen, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';

export default function Contact() {
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
        setError(response.data.message || 'Submission failed.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to connect to the backend server. Please verify your connection or contact us directly via WhatsApp/Phone.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Direct School Communication</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Introduce Robotics to Your Students
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We would be pleased to discuss how our Robotics and STEM programmes can support your school's extracurricular learning initiatives. Contact us to arrange a free introductory demonstration.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Organization Information & Quick WhatsApp/Call */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Direct Contact</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                School Partnerships Desk
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect directly with our founder to discuss scheduling, age-appropriate syllabus customization, or to request a live classroom robotics demonstration.
              </p>
            </div>

            {/* Organization Info Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 text-sm">
              <div>
                <strong className="block text-slate-400 text-xs uppercase font-semibold">Organisation Name</strong>
                <span className="font-bold text-navy-900 text-base">RoboNext STEM Technologies</span>
              </div>

              <div>
                <strong className="block text-slate-400 text-xs uppercase font-semibold">Founder & Technical Lead</strong>
                <span className="font-semibold text-slate-800">Logesh</span>
                <span className="block text-xs text-slate-500">B.Tech – Artificial Intelligence & Data Science</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-800 font-semibold">Headquarters & Serving Area</strong>
                  <span className="text-slate-600 text-xs leading-relaxed">
                    Chennai, Tamil Nadu<br />
                    Focusing on Velachery, Taramani, Perungudi, OMR & Thiruvanmiyur
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-800 font-semibold">Telephone</strong>
                  <a href="tel:+917598410327" className="text-blue-600 font-mono hover:underline">
                    +91 75984 10327
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <strong className="block text-slate-800 font-semibold">Official Inquiries Email</strong>
                  <a href="mailto:logeshs4605@gmail.com" className="text-blue-600 hover:underline">
                    logeshs4605@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp / Direct Actions */}
            <div className="space-y-3">
              <a
                href="https://wa.me/917598410327?text=Hello%20RoboNext%20STEM,%20we%20are%20interested%20in%20a%20Free%20Robotics%20Demonstration%20for%20our%20school."
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>

              <a
                href="mailto:logeshs4605@gmail.com?subject=School%20Robotics%20Demonstration%20Inquiry"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all text-sm"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Send Official School Email</span>
              </a>
            </div>

            {/* Promise Box */}
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed space-y-1">
              <p><strong>Completely Free Demonstration:</strong></p>
              <p>Our 45-minute demonstration session carries zero cost and zero obligation. We believe that seeing the students' genuine excitement is the most effective way for school leadership to evaluate our programmes.</p>
            </div>

          </div>

          {/* Right Column: 10-Field School Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10 space-y-6">
              
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Official Application</span>
                <h3 className="text-2xl font-bold text-navy-900 mt-1">School Demonstration Request Form</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Please complete the details below. Our technical team will review your schedule and respond within 24 hours.
                </p>
              </div>

              {success ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-navy-900">Enquiry Received Successfully!</h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.contact_person}</strong>. Your demonstration request for <strong>{formData.school_name}</strong> has been saved in our system and an official email acknowledgement was dispatched.
                  </p>
                  <p className="text-xs text-slate-500">
                    Our founder will connect with your office shortly to finalize the demo date and equipment preparations.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-primary text-xs py-2.5 px-6"
                    >
                      Submit Another School Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                  {error && (
                    <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Field 1: School Name */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      1. School Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        name="school_name"
                        required
                        value={formData.school_name}
                        onChange={handleChange}
                        placeholder=" "
                        className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Field 2 & 3: Contact Person & Designation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        2. Principal / Contact Person <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          name="contact_person"
                          required
                          value={formData.contact_person}
                          onChange={handleChange}
                          placeholder=" "
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        3. Designation <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                      >
                        <option value="Principal">Principal</option>
                        <option value="Correspondent">Correspondent</option>
                        <option value="School Trustee / Management">School Trustee / Management</option>
                        <option value="Academic Coordinator">Academic Coordinator</option>
                        <option value="Science Department Head">Science Department Head</option>
                        <option value="Computer Science Head">Computer Science Head</option>
                        <option value="Student">Student</option>
                        <option value="Other">Other Representative</option>
                      </select>
                    </div>
                  </div>

                  {/* Field 4 & 5: Official Email & Contact Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        4. Official Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=" "
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        5. Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder=" "
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 6 & 7: School Location & Classes Interested */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        6. School Location / Area <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          placeholder=" "
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        7. Classes Interested In
                      </label>
                      <div className="relative">
                        <BookOpen className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <select
                          name="classes_interested"
                          value={formData.classes_interested}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                        >
                          <option value="Classes 6–7">Classes 6–7 (Foundation Electronics)</option>
                          <option value="Classes 6–8">Classes 6–8 (Recommended Core)</option>
                          <option value="Classes 8–9">Classes 8–9 (Advanced Robotics & IoT)</option>
                          <option value="Classes 6–9 (All Middle/High Grades)">Classes 6–9 (All Grades)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Field 8 & 9: Expected Student Strength & Preferred Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        8. Expected Student Strength
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="number"
                          name="student_strength"
                          value={formData.student_strength}
                          onChange={handleChange}
                          placeholder=" "
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        9. Preferred Demonstration Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                        <input
                          type="date"
                          name="preferred_date"
                          value={formData.preferred_date}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Field 10: Additional Requirements */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      10. Additional Requirements / Schedule Preferences
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder=" "
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 transition-all shadow-md shadow-blue-500/20 text-base"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Demonstration Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Request a Free Demonstration</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-slate-500 mt-2">
                      🔒 Data saved securely in our database. An automated acknowledgement email will be sent immediately.
                    </p>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
