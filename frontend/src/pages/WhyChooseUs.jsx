import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Wrench, 
  Cpu, 
  Clock, 
  Radio, 
  HelpCircle, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

export default function WhyChooseUs({ onOpenDemoModal }) {
  const reasons = [
    {
      title: "1. Practical Learning",
      tagline: "Tangible hardware over abstract blackboard theory",
      desc: "Students work directly with real breadboards, microcontrollers, ultrasonic transceivers, and DC motor drivers rather than learning solely from diagrams or simulation software.",
      icon: Wrench,
      highlight: "Real physical components in every hand"
    },
    {
      title: "2. Project-Based Education",
      tagline: "Tangible milestones with working models",
      desc: "Every concept is anchored to an actual working creation. When learning reflection physics, students build a line follower. When learning distance formulas, they build an obstacle avoider.",
      icon: Cpu,
      highlight: "100% build-and-test retention"
    },
    {
      title: "3. Age-Appropriate Curriculum",
      tagline: "Calibrated specifically for Classes 6 through 9",
      desc: "We avoid overwhelming early middle schoolers with dense programming syntax. Concepts are scaffolded progressively: from basic circuits in Class 6 to microcontroller logic in Class 8 and IoT in Class 9.",
      icon: BookOpen,
      highlight: "Scaffolded difficulty curve"
    },
    {
      title: "4. Emerging Technology Exposure",
      tagline: "Foundational literacy in AI and Internet of Things",
      desc: "School students gain early demystification of automation, autonomous rovers, and sensor telemetry, preparing them for future higher-education STEM trajectories.",
      icon: Radio,
      highlight: "Future-ready engineering exposure"
    },
    {
      title: "5. Highly Interactive Teaching",
      tagline: "Curiosity and questioning actively nurtured",
      desc: "Our instructors guide rather than lecture. Students are actively encouraged to question why a motor runs in reverse, test varying battery voltages, and discover solutions collaboratively.",
      icon: HelpCircle,
      highlight: "Small mentor-to-student ratios"
    },
    {
      title: "6. School-Oriented Approach",
      tagline: "Zero friction with your existing academic timetable",
      desc: "Whether your school operates on 45-minute periods, Saturday club blocks, or after-school activity hours, we seamlessly synchronize with your administrative timetable.",
      icon: Clock,
      highlight: "Customizable session schedules"
    },
    {
      title: "7. Demonstration Before Commitment",
      tagline: "Evaluate our teaching quality completely free of charge",
      desc: "School principals and management can verify our teaching delivery, student excitement, and technical competence first-hand through our free introductory demonstration session.",
      icon: Sparkles,
      highlight: "Zero financial risk for schools"
    },
    {
      title: "8. Comprehensive Equipment Support",
      tagline: "We bring all demonstration kits & learning components",
      desc: "Schools do not need to invest millions in lab infrastructure upfront. We bring the required demonstration equipment, sensors, motor kits, and test mats to your campus.",
      icon: ShieldCheck,
      highlight: "All robotics kits provided by us"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">School Institutional Value</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Schools Should Consider Our Robotics Programmes
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Practical STEM education engineered with administrative ease, transparent pedagogy, and real student outcomes.
          </p>
        </div>
      </section>

      {/* 8 Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
                  <p className="text-xs font-semibold text-blue-600">{item.tagline}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Evaluation Guarantee Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-navy-900 text-white rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Zero Risk Evaluation</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Verify Our Pedagogy with a Free 45-Minute School Session
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We invite School Principals and Science Department Heads to book an introductory demonstration. Experience student excitement and inspect our training hardware before making any collaboration decisions.
            </p>
          </div>
          <button
            onClick={onOpenDemoModal}
            className="whitespace-nowrap px-8 py-3.5 rounded-xl font-bold text-navy-950 bg-cyan-300 hover:bg-cyan-200 active:scale-95 transition-all shadow-lg"
          >
            Schedule Free School Demo
          </button>
        </div>
      </section>

    </div>
  );
}
