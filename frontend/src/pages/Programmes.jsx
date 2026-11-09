import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Info,
  Calendar,
  Zap,
  Cpu
} from 'lucide-react';
import api from '../services/api';

export default function Programmes({ onOpenDemoModal }) {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgrammes() {
      try {
        const res = await api.get('/programmes');
        if (res.data.success && res.data.data.length > 0) {
          setProgrammes(res.data.data);
        }
      } catch (err) {
        console.warn('Using default programmes list:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProgrammes();
  }, []);

  // Static fallback data matching Section 7 requirements exactly
  const defaultProgrammes = [
    {
      id: 1,
      programme_name: "Programme 1: Introduction to Robotics",
      target_classes: "Classes 6–7",
      duration: "4 Weeks (8 Guided Sessions)",
      description: "An intuitive entry into modern engineering designed for early middle school learners. Students demystify what robots are and how basic circuits respond to the physical world.",
      topics: "What is Robotics?, Introduction to Electronics, Understanding Sensors, Motors and Their Applications, Basic Circuits, Introduction to Programming, Simple Robotic Applications",
      practical_activities: "Breadboard LED logic circuits, building a light-sensitive buzzer alarm, assembly of basic motor-driven mechanisms.",
      learning_outcomes: "Electronics safety, distinction between inputs and outputs, foundational algorithmic thinking, enthusiasm for STEM."
    },
    {
      id: 2,
      programme_name: "Programme 2: Practical Robotics",
      target_classes: "Classes 6–8",
      duration: "6 Weeks (12 Comprehensive Sessions)",
      description: "Our flagship school workshop series focusing on microcontrollers, sensor integration, and building autonomous vehicles that react to their environment.",
      topics: "Arduino Introduction, IR Sensors, Ultrasonic Sensors, DC Motors, Motor Drivers, Robot Chassis, Obstacle Avoider Robot, Line Follower Robot",
      practical_activities: "Assembling a 2-wheel drive robot chassis, wiring L298N motor drivers, calibrating ultrasonic sensors, testing obstacle avoidance tracks.",
      learning_outcomes: "Microcontroller C++ basics, motor control circuits, sensor feedback loops, hands-on mechanical assembly, systematic hardware debugging."
    },
    {
      id: 3,
      programme_name: "Programme 3: Advanced Robotics and IoT",
      target_classes: "Classes 8–9",
      duration: "8 Weeks (16 Intensive Sessions)",
      description: "A future-focused curriculum covering wireless telemetry, smartphone-controlled rovers, and smart automated environmental systems.",
      topics: "Arduino and ESP32, Sensor Integration, Bluetooth Communication, Wi-Fi Communication, Servo Motors, Mobile-Controlled Robots, Smart Dustbin, Smart Irrigation System, Introduction to IoT Applications",
      practical_activities: "Building a smartphone-paired Bluetooth rover, programming automated smart dustbin servo lids, wiring soil moisture pumps.",
      learning_outcomes: "Wireless protocol fundamentals (UART/Bluetooth), IoT principles, analog sensor telemetry, real-world civic and agricultural automation."
    },
    {
      id: 4,
      programme_name: "Programme 4: STEM and Innovation Workshops",
      target_classes: "Classes 6–9 (Flexible Formats)",
      duration: "1–2 Day Bootcamps / Science Week",
      description: "Fast-paced, high-energy experiential bootcamps that introduce students to Artificial Intelligence, Internet of Things, and engineering teamwork.",
      topics: "Introduction to Artificial Intelligence, Introduction to IoT, Technology and Innovation, Real-World Engineering Applications, Problem-Solving Activities, Mini Project Development",
      practical_activities: "Squad-based rapid prototype sprint, obstacle navigating speed challenge, mini-project engineering showcase.",
      learning_outcomes: "Collaboration under time constraints, creative technical expression, public speaking during model presentations."
    }
  ];

  const displayList = programmes.length > 0 ? programmes : defaultProgrammes;

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Classes 6 to 9 Curricula</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Structured Robotics Learning Programmes
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Age-appropriate, hands-on curricula engineered to turn school students from passive technology consumers into active inventors.
          </p>
        </div>
      </section>

      {/* Curriculum Customization Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-3.5 text-blue-900 text-sm">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">Pedagogical Adaptability Note for School Principals:</strong>
            <p className="text-blue-800 leading-relaxed text-xs sm:text-sm">
              Programme content, pacing and difficulty will be adaptively tailored according to students' age, prior exposure and school timetable requirements. All equipment and robotics kits are provided by RoboNext during sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Programmes List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {displayList.map((prog, index) => {
          const topicsArray = typeof prog.topics === 'string' 
            ? prog.topics.split(',').map(t => t.trim()) 
            : (Array.isArray(prog.topics) ? prog.topics : []);

          return (
            <div 
              key={prog.id || index}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Card Top Banner */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-navy-900">{prog.programme_name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    <Users className="w-3.5 h-3.5" />
                    {prog.target_classes}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200 text-slate-800">
                    <Clock className="w-3.5 h-3.5" />
                    {prog.duration}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {prog.description}
                </p>

                {/* Topics Covered */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Curriculum Topics Covered
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {topicsArray.map((topic, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Two Column Details: Activities & Outcomes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-blue-600" />
                      Hands-On Practical Activities
                    </strong>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {prog.practical_activities}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Expected Student Outcomes
                    </strong>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {prog.learning_outcomes}
                    </p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    * Available for weekly school clubs, extracurricular blocks, or vacation bootcamps.
                  </span>
                  <button
                    onClick={onOpenDemoModal}
                    className="btn-primary text-xs py-2.5 px-5 font-bold shrink-0"
                  >
                    Request Free Intro Demo For This Programme
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Customized Curriculum for Your School?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            We adapt session lengths to 45-minute class periods or 90-minute double periods. Contact us to design a pilot schedule for your school.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenDemoModal}
              className="btn-primary text-sm py-3 px-8 font-bold"
            >
              Schedule Free School Demo Session
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
