import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, Download, ShieldCheck, ExternalLink, Lock } from 'lucide-react';

export default function Footer({ onOpenDemoModal }) {
  const handleDownload = (docName) => {
    alert(`📄 [Document Download Notice]\nThe official PDF "${docName}" will be packaged and sent along with your personalized school collaboration package after requesting a free demonstration.`);
  };

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800">
      {/* Pre-footer Callout */}
      <div className="bg-gradient-to-r from-blue-900 to-navy-900 border-b border-navy-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">For School Management</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Want to see our robotics curriculum in action at your school?
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              We provide a complete, hands-on demonstration with working obstacle avoiders and line followers completely free of cost.
            </p>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="whitespace-nowrap px-6 py-3.5 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            Schedule Free School Demo
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">RoboNext <span className="text-cyan-400">STEM</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "We don't just teach robotics. We help students experience, build and understand technology."
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p><strong className="text-slate-300">Target Focus:</strong> Classes 6–9</p>
              <p><strong className="text-slate-300">Initial Geography:</strong> Velachery, Taramani, Perungudi, OMR, Thiruvanmiyur, Chennai</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Our Organisation & Founder</Link></li>
              <li><Link to="/programmes" className="hover:text-cyan-400 transition-colors">Robotics & STEM Programmes</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Student Project Portfolio</Link></li>
              <li><Link to="/why-choose-us" className="hover:text-cyan-400 transition-colors">Why Schools Choose Us</Link></li>
              <li><Link to="/methodology" className="hover:text-cyan-400 transition-colors">5-Stage Teaching Methodology</Link></li>
              <li><Link to="/partnerships" className="hover:text-cyan-400 transition-colors">School Partnership Models</Link></li>
              <li><Link to="/safety" className="hover:text-cyan-400 transition-colors">Safety & Child Protection</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact / Book Free Demo</Link></li>
            </ul>
          </div>

          {/* Services & Downloads */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Programmes & Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-300">Level 1: Introduction to Robotics (Cl 6–7)</li>
              <li className="text-slate-300">Level 2: Practical Robotics (Cl 6–8)</li>
              <li className="text-slate-300">Level 3: Advanced Robotics & IoT (Cl 8–9)</li>
              <li className="text-slate-300">STEM & Innovation Workshops</li>
              <li className="text-slate-400 text-xs italic">Robotics Laboratory Setup (Future Expansion)</li>
            </ul>

            <div className="mt-6 pt-4 border-t border-navy-850 space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase block">Downloads (School Packets)</span>
              <button
                onClick={() => handleDownload('RoboNext_Company_Profile.pdf')}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-800 transition-colors"
              >
                <span>Company Profile</span>
                <Download className="w-3.5 h-3.5 text-cyan-400" />
              </button>
              <button
                onClick={() => handleDownload('RoboNext_Curriculum_Syllabus.pdf')}
                className="w-full flex items-center justify-between px-3 py-2 text-xs rounded bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-800 transition-colors"
              >
                <span>Robotics Curriculum Outline</span>
                <Download className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-cyan-400 pl-2">
              Direct Office Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  Chennai, Tamil Nadu<br />
                  <span className="text-xs text-slate-400">(Serving Velachery, Taramani, Perungudi, OMR & Thiruvanmiyur)</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="mailto:enquiries@robonext.com" className="text-slate-300 hover:text-white transition-colors">
                  enquiries@robonext.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-400 shrink-0" />
                <a href="tel:+919876543210" className="text-slate-300 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="pt-2">
                <div className="p-3 rounded-lg bg-navy-900 border border-navy-800 text-xs text-slate-400">
                  <strong className="text-slate-200 block mb-1">Honest Commitment:</strong>
                  We are a newly established initiative backed by genuine technical expertise in Artificial Intelligence, Data Science, and practical hardware robotics.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} RoboNext STEM Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/safety" className="hover:text-slate-300">Safety Policy</Link>
            <Link to="/contact" className="hover:text-slate-300">School Inquiries</Link>
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors">
              <Lock className="w-3 h-3" />
              <span>School Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
