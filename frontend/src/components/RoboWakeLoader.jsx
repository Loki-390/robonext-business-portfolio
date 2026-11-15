import React, { useState, useEffect } from 'react';
import { Bot, Cpu, Zap, Radio, RefreshCw, Cog } from 'lucide-react';

export default function RoboWakeLoader({
  title = "Robot Core Booting Up...",
  subtitle = "Please wait a moment while the server wakes from sleep.",
  isInline = false
}) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getBootStatusText = (sec) => {
    if (sec < 6) return "Initializing neural controller & sensor bus...";
    if (sec < 14) return "Spinning up cloud containers & TLS handshake...";
    if (sec < 22) return "Connecting to TiDB Serverless database cluster...";
    if (sec < 30) return "Calibrating telemetry and dispatching payload...";
    return "Finalizing server wake sequence... Almost there!";
  };

  const progressPercent = Math.min(100, Math.round((secondsElapsed / 35) * 100));

  const content = (
    <div className="bg-navy-900/95 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl shadow-cyan-500/20 text-center relative overflow-hidden backdrop-blur-md">
      {/* Background cyber grid & scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 animate-pulse" />

      {/* Animated Robotics Core HUD Graphic */}
      <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
        {/* Outer rotating cyber ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-spin [animation-duration:8s]" />
        
        {/* Counter-rotating gear aura */}
        <div className="absolute -inset-2 rounded-full border border-blue-500/30 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
        
        {/* Glowing pulse ring */}
        <div className="absolute inset-2 rounded-full bg-cyan-500/10 animate-ping [animation-duration:3s]" />
        
        {/* Center robot mascot shield */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/40 z-10">
          <Bot className="w-9 h-9 text-white animate-bounce [animation-duration:2s]" />
        </div>

        {/* Small orbiting satellite gear */}
        <div className="absolute -top-1 -right-1 p-1 bg-navy-950 rounded-full border border-cyan-400 shadow">
          <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </div>
      </div>

      {/* Main Title & Polite Waking Notice */}
      <div className="space-y-1.5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-1">
          <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
          <span>Cloud Core Awakening</span>
        </div>
        
        <h3 className="text-xl font-extrabold text-white tracking-tight">
          {title}
        </h3>
        
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      {/* Progress Bar & Telemetry */}
      <div className="mt-6 space-y-2 relative z-10">
        <div className="flex justify-between items-center text-[11px] font-mono text-cyan-300/80">
          <span className="flex items-center gap-1">
            <Cog className="w-3.5 h-3.5 animate-spin" />
            <span>T+{secondsElapsed}s elapsed</span>
          </span>
          <span>{progressPercent}%</span>
        </div>

        <div className="w-full bg-navy-950 rounded-full h-2.5 overflow-hidden p-0.5 border border-navy-700">
          <div 
            className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-cyan-400"
            style={{ width: `${Math.max(8, progressPercent)}%` }}
          />
        </div>

        <p className="text-[11px] font-mono text-slate-400 text-left pt-1 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span className="truncate">{getBootStatusText(secondsElapsed)}</span>
        </p>
      </div>

      {/* Friendly eco-mode explanation */}
      <div className="mt-5 p-3 rounded-xl bg-navy-950/80 border border-navy-800 text-[11px] text-slate-400 leading-relaxed text-left">
        <strong className="text-slate-300 font-semibold block mb-0.5 flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Eco-Friendly Standby Notice
        </strong>
        Render's free cloud instance sleeps when idle. Waking takes ~25–40 seconds on the first action. Once awake, all subsequent requests respond instantly!
      </div>
    </div>
  );

  if (isInline) {
    return (
      <div className="py-4 flex justify-center w-full">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-md animate-fade-in">
      {content}
    </div>
  );
}
