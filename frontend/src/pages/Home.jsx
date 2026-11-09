import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  Radio, 
  Users, 
  Flame, 
  Lightbulb, 
  Code2, 
  Compass, 
  ShieldCheck, 
  Award,
  Zap,
  PlayCircle
} from 'lucide-react';

export default function Home({ onOpenDemoModal }) {
  const services = [
    {
      title: "Robotics Education",
      desc: "Structured curricular & extracurricular courses teaching mechanical assembly, electronic sensors, motor controls, and microcontrollers.",
      icon: Cpu,
      status: "Currently Offered",
      link: "/programmes",
      badge: "Core Service"
    },
    {
      title: "STEM Workshops",
      desc: "High-impact 1–2 day experiential workshops breaking down complex physics, electronics and mathematics into tangible projects.",
      icon: Sparkles,
      status: "Currently Offered",
      link: "/programmes",
      badge: "Popular in Schools"
    },
    {
      title: "IoT Learning Programmes",
      desc: "Hands-on projects with ESP32 & wireless protocols, connecting sensors to automated triggers, Bluetooth controls, and smart systems.",
      icon: Radio,
      status: "Currently Offered",
      link: "/programmes",
      badge: "Classes 8–9"
    },
    {
      title: "School Robotics Clubs",
      desc: "Long-term after-school or weekly club mentorship guiding students to prepare for regional science fairs and robotics challenges.",
      icon: Users,
      status: "Currently Offered",
      link: "/partnerships",
      badge: "Weekly Model"
    },
    {
      title: "Robotics Laboratory Setup",
      desc: "End-to-end consulting, specialized workbenches, component inventories, and safety protocols for institutional robotics labs.",
      icon: Wrench,
      status: "Future Expansion Service",
      link: "/partnerships",
      badge: "Roadmap 2026",
      isFuture: true
    },
    {
      title: "Practical Project Development",
      desc: "Dedicated project-based sprints where students independently design, wire, and program working prototypes like obstacle avoiders.",
      icon: Layers,
      status: "Currently Offered",
      link: "/projects",
      badge: "Hands-On Focus"
    }
  ];

  const outcomes = [
    { title: "Logical & Algorithmic Thinking", desc: "Breaking problems down into sequential decision trees and conditional logic." },
    { title: "Real-World Problem-Solving", desc: "Debugging circuit loops, sensor noise, and hardware tolerances hands-on." },
    { title: "Creativity & Prototyping", desc: "Transforming abstract theoretical concepts into functional physical models." },
    { title: "Technical Curiosity & Confidence", desc: "Demystifying everyday modern technology, autonomous vehicles and automation." },
    { title: "Microcontroller Programming", desc: "Learning core C++ / Arduino principles through tangible, visual outputs." },
    { title: "Practical Electronics Knowledge", desc: "Understanding voltage, current, sensors, motor drivers, and safe battery handling." },
    { title: "Collaborative Team Engineering", desc: "Working in small squads to build, troubleshoot and present functioning robotics." }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-navy-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-navy-800">
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Partnering with Matriculation, State Board & Private Schools in Chennai
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Building Tomorrow's Innovators Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-sky-200">Robotics & STEM</span> Education
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
                We bring practical Robotics, IoT and STEM learning experiences directly into school classrooms, helping students transform theoretical concepts into real-world technological creations.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenDemoModal}
                  className="btn-primary text-base py-3.5 px-7 shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2.5 font-bold"
                >
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                  <span>Request a Free Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/programmes"
                  className="btn-secondary text-base py-3.5 px-6 flex items-center justify-center gap-2 font-semibold"
                >
                  <span>Explore Our Programmes</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-navy-800 grid grid-cols-3 gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Free Demo at Your School</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Classes 6–9 Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>We Bring All Kits</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative border box */}
                <div className="bg-gradient-to-b from-navy-800/90 to-navy-950/90 border border-navy-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-6">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">RoboNext Hands-On STEM Lab</h4>
                        <p className="text-xs text-slate-400">Practical Microcontroller Architecture</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Hardware
                    </span>
                  </div>

                  {/* Visual Components Stack */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400"></span>
                        <span className="text-xs font-medium text-slate-200">Obstacle Avoiding Autonomous Vehicle</span>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">Ultrasonic + L298N</span>
                    </div>

                    <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                        <span className="text-xs font-medium text-slate-200">Dual-Sensor Precision Line Follower</span>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">IR Reflectance</span>
                    </div>

                    <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                        <span className="text-xs font-medium text-slate-200">Smartphone Bluetooth Rover Controller</span>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">HC-05 + Serial</span>
                    </div>

                    <div className="p-3 rounded-lg bg-navy-900/80 border border-navy-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                        <span className="text-xs font-medium text-slate-200">Automated Soil Moisture Irrigation Pump</span>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">IoT + Relays</span>
                    </div>
                  </div>

                  {/* Founder note */}
                  <div className="pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Curriculum Director: <strong>Logesh</strong> (B.Tech AI & DS)</span>
                    <Link to="/about" className="text-cyan-400 hover:underline">View Profile &rarr;</Link>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION B: INTRODUCTION                                      */}
      {/* ============================================================ */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Our Educational Stance</span>
          <h2 className="section-heading">Making Technology Education Practical</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 leading-relaxed pt-2">
            We believe that every student should have the opportunity to explore, understand and experience emerging technologies.
          </p>
          <p className="text-base text-slate-600 leading-relaxed">
            Our programmes introduce students to robotics, electronics, programming and IoT through practical demonstrations, guided activities and project-based learning. We work with schools to create meaningful extracurricular STEM learning opportunities that complement academic education.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Concept to Reality</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Students do not just memorize Ohm's Law or ultrasonic frequencies from textbooks; they connect the wires, measure the feedback, and see real motors spin.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Code Meets Motion</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Programming is taught as a tool to control the physical world. A simple 'if statement' in C++ turns into a robot steering away from an obstacle.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">School-Aligned Approach</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We fit within your academic timetable, zeroing out teacher friction by providing all robotics equipment, structured lesson plans, and dedicated mentors.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION C: OUR SERVICES                                      */}
      {/* ============================================================ */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Structured Collaboration</span>
              <h2 className="section-heading mt-1">Our Educational Services</h2>
              <p className="text-slate-600 text-sm mt-2">
                Designed specifically for matriculation and private school schedules in Chennai.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
              &bull; 5 Currently Active Services &bull; 1 Future Lab Setup Service
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((serv, idx) => {
              const IconComp = serv.icon;
              return (
                <div 
                  key={idx}
                  className={`relative p-8 rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between ${
                    serv.isFuture 
                      ? 'border-dashed border-slate-300 bg-slate-50/70' 
                      : 'border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        serv.isFuture ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        serv.isFuture ? 'bg-amber-100 text-amber-800' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {serv.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-navy-900">{serv.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{serv.desc}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-400">{serv.badge}</span>
                    <Link to={serv.link} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION D: FREE DEMONSTRATION SECTION (HIGH PROMINENCE)      */}
      {/* ============================================================ */}
      <section className="section-container">
        <div className="bg-gradient-to-br from-navy-900 via-navy-850 to-blue-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-navy-700">
          
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                No-Cost School Evaluation Session
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Experience Robotics Before Starting a Programme
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                We offer schools an introductory Robotics and STEM demonstration session completely free of cost. This session allows school management, science coordinators and students to experience our teaching methodology, explore working robotics projects and understand the value of practical technology education before considering a long-term collaboration.
              </p>

              {/* What the Free Demo includes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Live working robotics demonstrations</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Interactive explanations of sensors</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Introduction to circuits & programming</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Direct student interaction & Q&A</span>
                </div>
              </div>

              {/* Prominent CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenDemoModal}
                  className="px-8 py-4 rounded-xl font-extrabold text-base text-navy-950 bg-gradient-to-r from-cyan-300 to-blue-400 hover:from-cyan-200 hover:to-blue-300 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 text-navy-900" />
                  <span>Schedule a Free Demonstration</span>
                </button>
              </div>

              <div className="text-xs text-cyan-300/90 font-medium">
                ★ <strong>Completely Free</strong> – No Obligation to Purchase a Programme.
              </div>

            </div>

            {/* Right Card: Demo Agenda */}
            <div className="lg:col-span-5 bg-navy-950/70 rounded-2xl p-6 border border-navy-800 text-sm space-y-4">
              <h4 className="text-white font-bold text-base flex items-center gap-2 border-b border-navy-800 pb-3">
                <PlayCircle className="w-5 h-5 text-cyan-400" />
                45-Minute School Demonstration Flow
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-400 font-bold">10 min</span>
                  <span className="text-slate-300"><strong>Introduction:</strong> What is a robot? Microcontrollers vs ordinary computers.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-400 font-bold">15 min</span>
                  <span className="text-slate-300"><strong>Live Action:</strong> Obstacle avoidance vehicle and line tracking live test on the floor.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-400 font-bold">10 min</span>
                  <span className="text-slate-300"><strong>Hands-On Inspection:</strong> Students pass around ultrasonic sensors, IR pairs, and chassis.</span>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-cyan-400 font-bold">10 min</span>
                  <span className="text-slate-300"><strong>Discussion with Management:</strong> Review curriculum options and timetable feasibility.</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-700/40 text-[11px] text-blue-200">
                ⚡ Equipment notice: Our team brings all demonstration kits, power packs, and test tracks. School only needs to arrange a standard classroom or AV hall.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION E: STUDENT LEARNING OUTCOMES                         */}
      {/* ============================================================ */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs">Measurable Educational Impact</span>
          <h2 className="section-heading">Student Learning Outcomes</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Our curriculum cultivates both technical mastery and enduring cognitive problem-solving skills for school students in Classes 6–9.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {outcomes.map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                <h4 className="font-bold text-navy-900 text-base">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">{item.desc}</p>
            </div>
          ))}
          {/* 8th card linking to methodology */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-600 to-navy-900 text-white flex flex-col justify-between">
            <div>
              <span className="text-xs text-cyan-300 font-bold uppercase">Our Structured Pedagogy</span>
              <h4 className="font-bold text-lg text-white mt-1">5-Stage Teaching Methodology</h4>
              <p className="text-xs text-blue-100 mt-2">Introduce &bull; Demonstrate &bull; Explore &bull; Build &bull; Test & Present</p>
            </div>
            <Link to="/methodology" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white pt-4">
              <span>View 5-Stage Framework</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION F: SCHOOL PARTNERSHIP CTA                            */}
      {/* ============================================================ */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Collaborate With Us</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Let's Bring Robotics Education to Your School
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Partner with us to introduce structured, practical and engaging Robotics and STEM learning experiences to your students. We adapt to your academic schedule with zero initial capital investment required from the school.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/partnerships"
              className="btn-primary text-base py-3.5 px-8 font-bold"
            >
              Discuss a School Partnership
            </Link>
            <button
              onClick={onOpenDemoModal}
              className="btn-secondary text-base py-3.5 px-6 font-semibold"
            >
              Book Introductory Demonstration
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
