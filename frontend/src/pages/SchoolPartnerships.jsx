import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  Users, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers,
  FileText
} from 'lucide-react';

export default function SchoolPartnerships({ onOpenDemoModal }) {
  const models = [
    {
      id: 1,
      badge: "Zero-Cost Evaluation",
      name: "Model 1: Free Introductory Workshop",
      desc: "A single 45–60 minute interactive demonstration session conducted at your school campus completely free of cost. Designed for school principals and department heads to evaluate our hardware, teaching methodology, and student engagement before any commitment.",
      duration: "45–60 Minutes",
      strength: "1 Classroom / Batch (30–80 students)",
      equipment: "100% provided by RoboNext",
      pricing: "Completely Free – No Obligation",
      icon: Sparkles,
      highlight: true
    },
    {
      id: 2,
      badge: "Intensive Module",
      name: "Model 2: Short-Term Robotics Workshop",
      desc: "A structured, compact workshop conducted over 2 to 4 days (or across vacation bootcamps). Focuses on building one complete autonomous robotic creation, such as an Obstacle Avoider or Line Follower, from start to finish.",
      duration: "2 to 4 Days (8 to 12 Hours total)",
      strength: "Batches of 25–40 students",
      equipment: "All robotics kits & test tracks provided",
      pricing: "Custom quote based on batch size",
      icon: Clock
    },
    {
      id: 3,
      badge: "Term-Long Curriculum",
      name: "Model 3: Regular Robotics Programme",
      desc: "Weekly or bi-weekly scheduled classes integrated smoothly into your school's extracurricular or activity timetable. Delivers a comprehensive term curriculum spanning electronics, sensors, microcontroller code, and project creation.",
      duration: "1–2 Sessions per Week (Across Term)",
      strength: "Classes 6, 7, 8, or 9 batches",
      equipment: "RoboNext provides all learning hardware",
      pricing: "Per-student or per-batch school contract",
      icon: Calendar
    },
    {
      id: 4,
      badge: "Extracurricular Mentorship",
      name: "Model 4: School Robotics Club",
      desc: "We help your school establish, mentor and manage an official student Robotics Club. Club members work on creative problem-solving challenges, advanced IoT projects, and receive dedicated coaching for regional STEM exhibitions.",
      duration: "Ongoing Weekly / Saturday Club Blocks",
      strength: "Dedicated Club Squad (20–50 students)",
      equipment: "Modular components, sensors, microcontrollers",
      pricing: "Discussed according to club schedule",
      icon: Users
    },
    {
      id: 5,
      badge: "Future Expansion Service",
      name: "Model 5: Robotics Laboratory Setup",
      desc: "End-to-end consulting and implementation for schools establishing a dedicated permanent STEM / Robotics Laboratory on their campus. Covers workbench specifications, safety equipment, standardized kit inventories, and faculty orientation.",
      duration: "Turnkey Implementation",
      strength: "Institutional Lab (Serving All Grades)",
      equipment: "Custom hardware procurement & lab fitout",
      pricing: "Institutional consultation",
      icon: Wrench,
      isFuture: true
    }
  ];

  const steps = [
    { num: "01", title: "School Contacts Us", desc: "School principal or coordinator reaches out via our website form, official email, or telephone." },
    { num: "02", title: "Requirement Discussion", desc: "We discuss target grade levels (Classes 6–9), preferred timetable slots, and student batch sizes." },
    { num: "03", title: "Free Introductory Demo", desc: "Our team visits your school campus with working autonomous robots for a live 45-minute demonstration." },
    { num: "04", title: "Management Evaluation", desc: "School administration and science coordinators evaluate student response and teaching quality first-hand." },
    { num: "05", title: "Tailored Proposal", desc: "We submit a clear, transparent programme proposal customized to the school's approved schedule." },
    { num: "06", title: "Training Commences", desc: "Practical training sessions begin strictly under school supervision and according to the agreed calendar." }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">School Collaboration Models</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Building Stronger STEM Learning Opportunities Through School Partnerships
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Flexible collaboration structures tailored for matriculation, state board, and private schools across Chennai.
          </p>
        </div>
      </section>

      {/* Collaboration Models Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Engagement Options</span>
          <h2 className="section-heading">5 Structured Collaboration Models</h2>
          <p className="text-slate-600 text-sm">
            Duration, batch strength, equipment, and schedule will be customized according to each school's individual preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {models.map((m) => {
            const Icon = m.icon;
            return (
              <div 
                key={m.id}
                className={`p-8 rounded-2xl border transition-all flex flex-col justify-between ${
                  m.highlight 
                    ? 'bg-gradient-to-br from-blue-50/60 to-white border-blue-300 shadow-md ring-1 ring-blue-400/30' 
                    : (m.isFuture ? 'bg-slate-50/60 border-dashed border-slate-300' : 'bg-white border-slate-200 shadow-sm hover:shadow-md')
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      m.highlight 
                        ? 'bg-blue-600 text-white' 
                        : (m.isFuture ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700')
                    }`}>
                      {m.badge}
                    </span>
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-bold text-navy-900">{m.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>

                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <strong className="text-slate-900 block font-semibold">Typical Duration:</strong>
                      <span className="text-slate-600">{m.duration}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-semibold">Student Strength:</strong>
                      <span className="text-slate-600">{m.strength}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-semibold">Equipment Provision:</strong>
                      <span className="text-slate-600">{m.equipment}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900 block font-semibold">Commercial Basis:</strong>
                      <span className="text-blue-700 font-semibold">{m.pricing}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Model 0{m.id}</span>
                  <button
                    onClick={onOpenDemoModal}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>Discuss This Model</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How School Collaboration Works (6 Steps) */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Step-by-Step Process</span>
            <h2 className="section-heading">How School Collaboration Works</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 text-sm">
              A transparent, hassle-free onboarding process where school leadership maintains complete oversight at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-lg bg-navy-900 text-white font-extrabold flex items-center justify-center text-sm">
                    {st.num}
                  </span>
                  <span className="text-[11px] font-semibold text-blue-600 uppercase">Stage {idx + 1}</span>
                </div>
                <h4 className="font-bold text-navy-900 text-base">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* School Autonomy Callout */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm text-center max-w-3xl mx-auto font-medium">
            🛡️ <strong>School Leadership Control:</strong> The school remains fully in control of scheduling, student batch selection, classroom arrangements, and final programme approval at all times.
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Start With Stage 1</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Schedule a Free Introductory Session for Your School
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Experience our robotics demonstrations and discuss how our curriculum can enhance your school's STEM offerings.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDemoModal}
              className="btn-primary text-sm py-3 px-8 font-bold"
            >
              Request Free Demonstration
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
