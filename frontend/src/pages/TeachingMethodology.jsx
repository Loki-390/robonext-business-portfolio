import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  PlayCircle, 
  Search, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Compass,
  Cpu
} from 'lucide-react';

export default function TeachingMethodology({ onOpenDemoModal }) {
  const steps = [
    {
      step: "01",
      name: "INTRODUCE",
      badge: "Stage 1: Context & Physics",
      heading: "Explain the concept using real-world relatable examples",
      desc: "Before touching any hardware, our instructors connect the session topic to everyday applications that students encounter. For instance, before teaching ultrasonic distance sensors, we discuss how autonomous cars sense obstacles or how bats use echolocation. This grounds abstract science into relatable reality.",
      icon: Lightbulb,
      activity: "Real-world analogies & whiteboard concept breakdown"
    },
    {
      step: "02",
      name: "DEMONSTRATE",
      badge: "Stage 2: Live Action",
      heading: "Show students how the technology works live",
      desc: "The instructor displays a working prototype on the classroom floor or bench. Students observe the physical behavior—such as a line follower tracking a curved track or a robotic gripper closing on command. Seeing the finished product immediately captures curiosity and establishes a clear end goal.",
      icon: PlayCircle,
      activity: "Live hardware demonstration & physical behavior observation"
    },
    {
      step: "03",
      name: "EXPLORE",
      badge: "Stage 3: Component Inspection",
      heading: "Introduce components, sensors, circuits and programming",
      desc: "Students receive individual component trays containing microcontrollers, motor drivers, IR sensors, and jumper wires. We inspect pinouts, discuss why pull-up resistors matter, observe analog vs digital multimeter readings, and review the logic flowcharts or code blocks that govern behavior.",
      icon: Search,
      activity: "Hands-on component handling, pin identification, logic review"
    },
    {
      step: "04",
      name: "BUILD",
      badge: "Stage 4: Guided Construction",
      heading: "Guide students through assembling and developing projects",
      desc: "Working in small collaborative squads of 2 to 3, students follow step-by-step assembly blueprints. They mount the chassis, secure DC motors, route wiring systematically to avoid shorts, and interface sensor pins to microcontroller headers. Instructors supervise closely to maintain electrical safety.",
      icon: Wrench,
      activity: "Mechanical chassis assembly, breadboard circuit wiring, microcontroller flashing"
    },
    {
      step: "05",
      name: "TEST AND PRESENT",
      badge: "Stage 5: Debugging & Showcase",
      heading: "Students test projects, understand errors and demonstrate creations",
      desc: "Rarely does a robot work perfectly on first power-up—and that is where true learning happens! Students test on the competition track, identify loose wires or incorrect sensor threshold values, debug their creations, and finally stand before peers to present how their robot functions.",
      icon: CheckCircle2,
      activity: "Track calibration, error diagnosis, student presentation to peers"
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Our 5-Stage Pedagogy</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How We Teach Robotics
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A structured, experiential framework ensuring every student transitions from curiosity to confident hands-on engineering execution.
          </p>
        </div>
      </section>

      {/* Methodology Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div 
                key={i}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Step Number & Icon */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-blue-500/20">
                      {st.step}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
                        STEP {i + 1}
                      </span>
                      <h3 className="text-2xl font-black text-navy-900 tracking-tight">
                        {st.name}
                      </h3>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="md:col-span-9 space-y-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {st.badge}
                    </div>

                    <h4 className="text-xl font-bold text-navy-900 leading-snug">
                      {st.heading}
                    </h4>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {st.desc}
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
                      <strong className="text-navy-900 shrink-0">Classroom Activity:</strong>
                      <span>{st.activity}</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Experience the Pedagogy</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            See This 5-Stage Framework in Action at Your School
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Book our 45-minute introductory demonstration. We conduct a condensed version of this 5-stage learning process completely free of cost for your students.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDemoModal}
              className="btn-primary text-sm py-3 px-8 font-bold"
            >
              Request Free School Demonstration
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
