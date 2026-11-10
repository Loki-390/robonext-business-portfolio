import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ArrowRight, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenDemoModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Projects', path: '/projects' },
    { name: 'Why Choose Us', path: '/why-choose-us' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'School Partnerships', path: '/partnerships' },
    { name: 'Safety', path: '/safety' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-md border-b border-navy-800 text-white shadow-lg">
      <div className="w-full px-6 lg:px-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  RoboNext
                </span>
                <span className="text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-blue-600/30 text-cyan-300 border border-blue-500/30">
                  STEM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                Practical Robotics for Schools &bull; Chennai
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                  isActive(link.path)
                    ? 'text-cyan-400 bg-white/5 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-600/30 hover:shadow-cyan-500/30 active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-100" />
              <span>REQUEST A FREE DEMO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenDemoModal}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              FREE DEMO
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="xl:hidden bg-navy-950 border-b border-navy-800 px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? 'text-cyan-400 bg-navy-900 font-semibold border-l-4 border-cyan-400'
                  : 'text-slate-300 hover:text-white hover:bg-navy-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-navy-850">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDemoModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md"
            >
              <Sparkles className="w-5 h-5 text-cyan-200" />
              REQUEST A FREE DEMO SESSION
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
