import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Cpu, 
  Code, 
  Video, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  X, 
  Zap, 
  Radio, 
  Droplet, 
  Trash2,
  Sparkles
} from 'lucide-react';
import api from '../services/api';

export default function Projects({ onOpenDemoModal }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Static fallback projects matching Section 8 requirements
  const defaultProjects = [
    {
      id: 1,
      project_name: "Obstacle Avoider Robot",
      category: "Autonomous Robotics",
      description: "A robotic vehicle that uses ultrasonic sound waves to detect barriers in front of it and automatically recalculates wheel rotation to avoid collisions without human intervention.",
      technologies: "Arduino Uno, HC-SR04 Ultrasonic Sensor, L298N Dual H-Bridge Motor Driver, Geared DC Motors, Chassis",
      working_principle: "The ultrasonic sensor transmits a 40kHz sonic burst and counts the microseconds until the echo returns. Distance = (time × speed of sound) / 2. If distance < 20cm, microcontroller stops both motors, reverses, and steers away.",
      learning_outcomes: "Sensor feedback loops, time-to-distance physics equations, digital signal processing, logic branching with conditional statements.",
      badge: "Core Project",
      status: "published"
    },
    {
      id: 2,
      project_name: "Line Follower Robot",
      category: "Sensor Robotics",
      description: "An autonomous path-tracking mobile robot that follows a high-contrast black line track on a white surface using dual photodiode infrared reflectance sensors.",
      technologies: "Arduino Uno, Dual IR TCRT5000 Sensor Modules, Motor Driver Shield, 6V High-Torque Motors",
      working_principle: "Infrared emitters beam light downwards. Black surface absorbs infrared photons (low reflection), while white surface reflects light back (high reflection). Differential comparator logic adjusts left and right motor speeds in real-time.",
      learning_outcomes: "Optoelectronics, differential drive physics, closed-loop steering correction, sensor potentiometer calibration.",
      badge: "Competition Ready",
      status: "published"
    },
    {
      id: 3,
      project_name: "Bluetooth-Controlled Smart Rover",
      category: "Wireless Systems",
      description: "A wirelessly tele-operated robotic vehicle commanded directly from a paired Android or iOS mobile phone application over serial RF Bluetooth.",
      technologies: "Arduino Uno, HC-05 Bluetooth Module, L298N Motor Driver, Bluetooth Controller Mobile App",
      working_principle: "Mobile phone transmits single-character UART commands ('F', 'B', 'L', 'R') at 9600 baud rate. The HC-05 module passes data to Arduino's hardware serial pins, which map characters to corresponding motor driver transistor switches.",
      learning_outcomes: "Wireless protocol communication, baud rate timing, mobile-to-hardware interfacing, serial data buffering.",
      badge: "Interactive Demo",
      status: "published"
    },
    {
      id: 4,
      project_name: "Smart Contactless Dustbin",
      category: "Smart Automation",
      description: "A hygienic automated waste disposal system that senses incoming hands or discarded items and automatically lifts its lid using a precision servo motor.",
      technologies: "Arduino Nano, HC-SR04 Ultrasonic Sensor, SG90 Micro Servo Motor, 9V Power Supply",
      working_principle: "Continuously pulses sonar waves. When a hand is sensed within 15 centimeters, the microcontroller sends PWM pulses to rotate the servo horn from 0 to 90 degrees, delays 4 seconds for disposal, and gently closes.",
      learning_outcomes: "Angular servo positioning (PWM pulses), real-world civic health engineering, automated mechanical linkages.",
      badge: "Civic Automation",
      status: "published"
    },
    {
      id: 5,
      project_name: "Smart Soil Irrigation System",
      category: "IoT & Agriculture",
      description: "An automated agricultural IoT prototype that continuously reads soil volumetric water moisture and switches a submersible water pump relay when dryness is detected.",
      technologies: "Arduino Uno, Soil Moisture Conductivity Probe, 5V Electromechanical Relay, Submersible Mini Pump",
      working_principle: "Measures electrical resistance across two exposed soil prongs. Dry soil increases resistance (drops voltage reading). When analog voltage crosses the calibrated dryness threshold, the relay triggers the 5V pump circuit.",
      learning_outcomes: "Environmental sensing, analog-to-digital conversion (ADC), safe relay switching of higher current loads, water conservation logic.",
      badge: "Smart Farming",
      status: "published"
    }
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get('/projects');
        if (res.data.success && res.data.data.length > 0) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.warn('Using default projects list:', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  const categories = ['All', 'Autonomous Robotics', 'Sensor Robotics', 'Wireless Systems', 'Smart Automation', 'IoT & Agriculture'];

  const filteredProjects = activeCategory === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Header */}
      <section className="bg-navy-900 text-white py-16 sm:py-20 border-b border-navy-800 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Student Practical Portfolio</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            From Concepts to Working Creations
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real working robotics and IoT prototypes that students build, wire, troubleshoot and present during our practical school workshops.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id || idx}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header & Category */}
              <div>
                {/* Visual Placeholder Header */}
                <div className="h-52 bg-gradient-to-tr from-navy-900 to-navy-850 p-6 flex flex-col justify-between relative overflow-hidden text-white border-b border-navy-800">
                  <div className="absolute right-4 bottom-2 opacity-15">
                    <Cpu className="w-32 h-32 text-cyan-400" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Hardware Demo #{idx + 1}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      {project.project_name}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono">
                      Working Demonstration Model
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Hardware & Components:
                    </span>
                    <p className="text-xs font-semibold text-navy-900">
                      {project.technologies}
                    </p>
                  </div>

                  {/* Working Principle */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600" />
                      Working Principle & Physics:
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                      {project.working_principle}
                    </p>
                  </div>

                  {/* Student Learning Outcomes */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Student Engineering Takeaways:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed pl-1">
                      {project.learning_outcomes}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedVideo(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-blue-600" />
                  <span>View Project Details</span>
                </button>
                <button
                  onClick={onOpenDemoModal}
                  className="btn-primary text-xs py-2 px-4 font-bold"
                >
                  See Live at Your School
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Video / Details Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-lg text-navy-900">{selectedVideo.project_name}</h4>
              <button onClick={() => setSelectedVideo(null)} className="p-1 text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Visual representation */}
            <div className="aspect-video bg-navy-900 rounded-xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
              <Play className="w-12 h-12 text-cyan-400 animate-pulse" />
              <div>
                <p className="font-bold text-sm">Hardware Demonstration Demonstration Video</p>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Actual live demonstration of this working model is brought directly to your school auditorium or science laboratory during the free demonstration session.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-2">
              <p><strong>Primary Technologies:</strong> {selectedVideo.technologies}</p>
              <p><strong>Physics / Electronics Logic:</strong> {selectedVideo.working_principle}</p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button onClick={() => setSelectedVideo(null)} className="btn-secondary text-xs py-2 px-4">
                Close
              </button>
              <button 
                onClick={() => { setSelectedVideo(null); onOpenDemoModal(); }}
                className="btn-primary text-xs py-2 px-4"
              >
                Schedule Free Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="bg-navy-900 text-white py-16 border-t border-navy-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">Hands-On Testing</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            We Bring These Working Robots Directly to Your School
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Book our 45-minute zero-cost introductory session so your students can see, touch, and test these autonomous models in person.
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
