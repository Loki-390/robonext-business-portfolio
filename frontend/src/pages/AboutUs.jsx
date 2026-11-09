import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  Lightbulb, 
  User, 
  GraduationCap, 
  Cpu, 
  Presentation, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Code
} from 'lucide-react';

export default function AboutUs({ onOpenDemoModal }) {
  const philosophies = [
    { title: "Learn by Doing", desc: "Students work with physical electronic components and tangible circuits rather than memorizing static textbook diagrams." },
    { title: "Understand Before Building", desc: "Before assembling a chassis or sensor, students learn the physics and mechanics behind how and why it operates." },
    { title: "Experiment and Explore", desc: "We foster an encouraging environment where questions, component testing, and curiosity are actively celebrated." },
    { title: "Build Real Projects", desc: "Every module concludes with a fully functioning creation—from line followers to smart dustbins—that students can demonstrate with pride." },
    { title: "Develop Problem-Solving Skills", desc: "Debugging a loose wire or adjusting sensor threshold values teaches students perseverance and critical troubleshooting." }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header Banner */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Our Background & Vision</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            About Our Organisation
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between textbook science curricula and real-world technology innovation for school students across Chennai.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Who We Are</span>
            <h2 className="section-heading">Introducing Practical STEM to School Students</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
            
            <p className="text-slate-600 text-base leading-relaxed">
              We are an emerging Robotics and STEM Education initiative focused on introducing practical technology learning opportunities to school students.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Our goal is to bridge the gap between theoretical learning and real-world technological applications through hands-on robotics, electronics, programming and IoT education.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Rather than presenting robotics as an inaccessible, high-cost domain, we deliver structured, age-appropriate programmes tailored for students in Classes 6 through 9.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenDemoModal}
                className="btn-primary text-sm py-3 px-6 font-bold"
              >
                Request a Free School Demonstration
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
              <h3 className="font-bold text-navy-900 text-lg border-b border-slate-200 pb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                Institutional Commitment
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                As a newly launched educational initiative, our credibility rests on absolute transparency, genuine technical expertise, and student-first safety. We do not make exaggerated claims; instead, we offer school principals the ability to inspect our teaching methodology first-hand before making any commitments.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <strong className="block text-slate-900 font-semibold mb-1">Target Schools</strong>
                  <span className="text-slate-600">Matriculation, State Board & Private Schools</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <strong className="block text-slate-900 font-semibold mb-1">Target Age Group</strong>
                  <span className="text-slate-600">Classes 6 to 9 (Middle & Early High School)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Our Mission</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                To make robotics, electronics, programming and emerging technologies accessible to school students through practical, interactive and project-based learning.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                &bull; Accessible learning kits &bull; Hands-on assembly &bull; Classroom-friendly pacing
              </div>
            </div>

            {/* Vision */}
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900">Our Vision</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                To become a trusted Robotics and STEM Education partner for schools by helping students develop technological knowledge, creativity, logical thinking and practical problem-solving skills.
              </p>
              <div className="pt-2 text-xs text-slate-500">
                &bull; Long-term school partnerships &bull; Student innovation &bull; Ethical engineering mindset
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Educational Philosophy */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Core Principles</span>
          <h2 className="section-heading">Our Educational Philosophy</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm">
            How we structure every classroom session to maximize retention, student engagement, and genuine understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophies.map((phil, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                0{i + 1}
              </div>
              <h4 className="font-bold text-navy-900 text-lg">{phil.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{phil.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Profile Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-navy-800">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Profile Avatar / Photo Card */}
            <div className="lg:col-span-4 text-center">
              <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-1.5 shadow-xl">
                <div className="w-full h-full bg-navy-900 rounded-xl flex flex-col items-center justify-center text-slate-300 space-y-2">
                  <User className="w-16 h-16 text-cyan-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Founder Profile</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mt-4">Logesh</h3>
              <p className="text-cyan-400 text-sm font-medium">Founder & Technical Lead</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-400/30">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>B.Tech – Artificial Intelligence & Data Science</span>
              </div>
            </div>

            {/* Founder Details */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Genuine Technical Background</span>
                <h4 className="text-2xl font-bold text-white mt-1">
                  Passionate About Introducing Emerging Tech to School Students
                </h4>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Holding a degree in <strong>Artificial Intelligence and Data Science</strong>, the founder possesses direct, practical engineering exposure to microcontroller programming, sensor interfacing, and IoT architecture. 
              </p>

              {/* Genuine Experience Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-start gap-2.5">
                  <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Hands-on experience engineering obstacle-avoiding and line-following robotic models.</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-start gap-2.5">
                  <Presentation className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Conducted technical webinars and interactive robotics demonstrations in college.</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-start gap-2.5">
                  <Code className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Practical exposure to Arduino, ESP32, ultrasonic, IR, motor drivers, and serial communication.</span>
                </div>
                <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">Dedicated to structured, safe, age-appropriate pedagogy for middle schoolers.</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-200">
                <strong>Authentic Positioning:</strong> We present this as a newly established educational initiative backed by genuine technical and practical expertise. We do not invent company history or school affiliations. We let our live classroom demonstrations prove our value.
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
