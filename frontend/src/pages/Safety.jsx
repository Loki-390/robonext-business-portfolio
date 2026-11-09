import React from 'react';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Eye, 
  Users, 
  Lock, 
  CheckCircle2, 
  FileCheck, 
  AlertTriangle,
  HeartHandshake,
  Check
} from 'lucide-react';

export default function Safety({ onOpenDemoModal }) {
  const commitments = [
    {
      title: "1. Strictly Low-Voltage DC Electronics (5V–9V)",
      desc: "All educational hardware, sensors, Arduino boards and motors operate exclusively on safe, low-voltage direct current (5V USB or 9V battery packs). Students are never exposed to 230V alternating current mains power.",
      icon: BatteryCharging
    },
    {
      title: "2. Age-Appropriate Component Handling",
      desc: "Activities for Classes 6–7 utilize solderless breadboards, secure jumper wires, and rounded plastic chassis. No soldering irons or hazardous chemicals are introduced into student sessions.",
      icon: ShieldCheck
    },
    {
      title: "3. Sessions Conducted Under School Supervision",
      desc: "Our workshops are always conducted in active presence and coordination with the school's designated science teacher, computer science faculty, or assigned coordinator.",
      icon: Users
    },
    {
      title: "4. Student Privacy & Parental Consent",
      desc: "We strictly respect student privacy. No photographs or video recordings of students are captured, stored, or published without prior explicit written permission from both the school management and parents.",
      icon: Lock
    },
    {
      title: "5. Safe Equipment & Tool Management",
      desc: "All kits, screwdrivers, batteries, and chassis components are inventoried systematically before and after every single session to ensure zero items are misplaced or mishandled.",
      icon: FileCheck
    },
    {
      title: "6. Compliance with Institutional Policies",
      desc: "Our instructors respect all institutional campus guidelines, discipline codes, visitor registration protocols, and child-safeguarding standards enforced by the school.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Child Protection & Safety Protocols</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Responsible, Safe and Structured Learning
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Ensuring a secure, supervised and transparent environment for every student during practical robotics activities.
          </p>
        </div>
      </section>

      {/* Safety Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Our Professional Commitments</span>
          <h2 className="section-heading">Core Safety Principles for School Campuses</h2>
          <p className="text-slate-600 text-sm">
            We understand the profound responsibility of working with school children. Safety is integrated into every kit design and lesson blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commitments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-900 leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Verification & Transparency Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-6">
          <h3 className="text-2xl font-bold text-navy-900 flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-emerald-600" />
            School Verification & Onboarding Readiness
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            As a newly established educational startup, we believe in radical transparency. We do not claim unverified government certifications or third-party badges. Instead, we willingly submit to any security clearance, identity verification, background screening, or faculty onboarding process your school administration mandates prior to campus entry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-xs text-slate-700">
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Government Identity Verification Ready</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Academic Degree Attestation Ready</span>
            </div>
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>School Visitor Logbook Compliance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have Questions Regarding School Safety Policies?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            We are glad to address any specific child-safeguarding or campus access guidelines with your management team.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDemoModal}
              className="btn-primary text-sm py-3 px-8 font-bold"
            >
              Discuss Safety & Book Demonstration
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
