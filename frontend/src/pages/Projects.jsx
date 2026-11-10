import React, { useState, useEffect } from 'react';
import obstacleAvoiderImg from '../assets/Obstacle Avoider Robot.jpg';
import lineFollowerImg from '../assets/Line Follower Robot.png';
import bluetoothController from '../assets/Bluetooth-Controlled Smart Rover.png';
import robotSoccerImg from '../assets/Robot Soccer.png';
import humanoidRobotImg from '../assets/Humanoid Robot.png';

import { 
  Zap, 
  CheckCircle2, 
  Play, 
  X, 
  Cpu
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
      image: obstacleAvoiderImg,
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
      image: lineFollowerImg,
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
      image: bluetoothController,
      description: "A wirelessly tele-operated robotic vehicle commanded directly from a paired Android or iOS mobile phone application over serial RF Bluetooth.",
      technologies: "Arduino Uno, HC-05 Bluetooth Module, L298N Motor Driver, Bluetooth Controller Mobile App",
      working_principle: "Mobile phone transmits single-character UART commands ('F', 'B', 'L', 'R') at 9600 baud rate. The HC-05 module passes data to Arduino's hardware serial pins, which map characters to corresponding motor driver transistor switches.",
      learning_outcomes: "Wireless protocol communication, baud rate timing, mobile-to-hardware interfacing, serial data buffering.",
      badge: "Interactive Demo",
      status: "published"
    },
    {
      id: 4,
      project_name: "Robot Soccer",
      category: "Wireless Systems",
      image: robotSoccerImg,
      description: "An interactive, agile mobile robot designed to compete in robotic soccer matches. It utilizes a custom-designed front bumper and scoop mechanism to capture, control, and shoot a small ball while maneuvering around opponents.",
      technologies: "Arduino Uno, HC-05 Bluetooth Module (or RF Receiver), L298N Dual H-Bridge Motor Driver, High-Torque Geared DC Motors, Custom Dribbler/Scoop Attachment, Li-ion Rechargeable Battery Pack",
      working_principle: "The robot receives real-time wireless drive and gameplay commands (Forward, Reverse, Left, Right, and Spin Kick) from a custom mobile app or remote controller. A specialized front mechanical scoop is designed with inward-curved guides to cradle and corral the rolling ball. Dual H-Bridge motor driver circuits dynamically change motor polarity to execute rapid pivoting, dribbling, and shot-making movements.",
      learning_outcomes: "Mechanical design for ball capture (scoops), wireless controller integration (serial UART packets), remote speed and torque control (PWM), real-time game strategy execution, and motor polarity manipulation.",
      badge: "Interactive Match Ready",
      status: "published"
    },
    {
      id: 5,
      project_name: "Humanoid Robot",
      category: "Bipedal & Advanced Robotics",
      image: humanoidRobotImg,
      description: "A compact bipedal humanoid robot designed to mimic natural human gestures and locomotion. It features multi-jointed legs and arms, enabling it to wave, detect its environment, and execute balancing routines, serving as an advanced showcase of multi-servo system integration.",
      technologies: "Arduino Nano/Uno, 8x SG90 (or MG90S) Micro Servo Motors, 16-Channel Servo Driver Shield (PCA9685), HC-SR04 Ultrasonic Sensor, Bipedal Black Acrylic Chassis & Brackets, Rechargeable 7.4V Li-ion Battery pack",
      working_principle: "Multiple servomotors (joints) coordinate simultaneously to alter the robot's center of gravity without falling. An Arduino, via an I2C servo expansion shield, sends specific pulse-width modulation (PWM) commands to control each joint's angles dynamically. It uses a front-facing ultrasonic sensor in the 'head' to calculate real-world obstacle distances, triggering responsive programs (e.g., stopping or changing paths) when barriers are near.",
      learning_outcomes: "Multi-joint coordinate geometry, multi-servo calibration, I2C bus serial communication, PWM joint angle mapping, algorithm design for gait and gesture sequences, and center-of-gravity physics.",
      badge: "Flagship Project",
      status: "published"
    }
  ];

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await api.get('/projects');
        if (res.data?.success && res.data?.data?.length > 0) {
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
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Clean Photo Container */}

                <div className="relative w-full h-72 sm:h-80 bg-slate-900 overflow-hidden flex items-center justify-center">
                  
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.project_name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-navy-950 to-navy-900 flex items-center justify-center">
                      <Cpu className="w-16 h-16 text-cyan-400/30" />
                    </div>
                  )}

                  {/* Floating Badges pinned to corners */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-navy-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/30 shadow-md">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-200 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 shadow-md">
                      Hardware Demo #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Clear Title Bar (Below the Photo) */}
                <div className="p-6 pb-2 border-b border-slate-100 bg-white">
                  <h3 className="text-2xl font-extrabold text-navy-950 tracking-tight">
                    {project.project_name}
                  </h3>
                  <p className="text-xs text-blue-600 font-mono font-semibold mt-1">
                    Working Demonstration Model
                  </p>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-6 pt-4">
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

      {/* Details Modal */}
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
            <div className="aspect-video relative rounded-xl overflow-hidden bg-navy-950 border border-slate-200">
              {selectedVideo.image ? (
                <img 
                  src={selectedVideo.image} 
                  alt={selectedVideo.project_name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
                  <Play className="w-12 h-12 text-cyan-400 animate-pulse" />
                  <p className="font-bold text-sm">Hardware Demonstration Video</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent flex flex-col justify-end p-4 text-white">
                <p className="font-bold text-sm">Working Hardware Model</p>
                <p className="text-xs text-slate-300 mt-0.5">
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