import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  CheckCircle, 
  FileText, 
  Award, 
  ArrowRight, 
  RefreshCw, 
  Cpu, 
  TrendingUp,
  School,
  Clock
} from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    demoScheduled: 0,
    demoCompleted: 0,
    proposalSent: 0,
    confirmed: 0,
    closed: 0
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [statsRes, enqRes] = await Promise.all([
        api.get('/enquiries/stats'),
        api.get('/enquiries')
      ]);

      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      if (enqRes.data.success) {
        setRecentEnquiries(enqRes.data.data.slice(0, 5));
      }
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Enquiries', count: stats.total, color: 'border-slate-300 text-navy-900 bg-white', icon: Inbox },
    { title: 'New Requests', count: stats.new, color: 'border-blue-400 text-blue-700 bg-blue-50/60', icon: Sparkles },
    { title: 'Schools Contacted', count: stats.contacted, color: 'border-amber-300 text-amber-700 bg-amber-50/60', icon: PhoneCall },
    { title: 'Demos Scheduled', count: stats.demoScheduled, color: 'border-purple-300 text-purple-700 bg-purple-50/60', icon: Calendar },
    { title: 'Demos Completed', count: stats.demoCompleted, color: 'border-cyan-300 text-cyan-700 bg-cyan-50/60', icon: CheckCircle },
    { title: 'Proposals Sent', count: stats.proposalSent, color: 'border-indigo-300 text-indigo-700 bg-indigo-50/60', icon: FileText },
    { title: 'Confirmed Partnerships', count: stats.confirmed, color: 'border-emerald-400 text-emerald-700 bg-emerald-50/60', icon: Award }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Demo Scheduled': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Demo Completed': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Proposal Sent': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Partnership Confirmed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header and Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Institutional Partnerships Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time tracking of school enquiries, introductory demonstrations, and curriculum proposals across Chennai.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm active:scale-95 transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Stats</span>
          </button>
          <Link
            to="/admin/enquiries"
            className="btn-primary text-xs py-2 px-4 font-bold"
          >
            Manage Pipeline
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i}
              className={`p-5 rounded-2xl border shadow-sm flex flex-col justify-between ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">{card.title}</span>
                <Icon className="w-4 h-4 opacity-70" />
              </div>
              <div className="mt-4">
                <span className="text-3xl sm:text-4xl font-black tracking-tight">{card.count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Enquiries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-navy-900 text-base">Recent Demonstration Requests</h3>
            </div>
            <Link to="/admin/enquiries" className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {recentEnquiries.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">
                No school enquiries recorded yet.
              </div>
            ) : (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-navy-900 truncate">{enq.school_name}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(enq.enquiry_status)}`}>
                        {enq.enquiry_status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{enq.contact_person} ({enq.designation})</span>
                      <span>&bull;</span>
                      <span>{enq.location}</span>
                      <span>&bull;</span>
                      <span>Target: {enq.classes_interested || 'Classes 6–9'}</span>
                    </div>
                  </div>

                  <Link
                    to="/admin/enquiries"
                    className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-colors"
                  >
                    Details &rarr;
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Admin Navigation & Tools */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              Content & Curricula Management
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maintain published courses, syllabus modules, and project portfolio items visible to school principals.
            </p>
            <div className="space-y-2 pt-2">
              <Link
                to="/admin/programmes"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all"
              >
                <span>Edit Programmes (Classes 6–9)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                to="/admin/projects"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all"
              >
                <span>Edit Project Portfolio (Obstacle Avoider, etc.)</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <Link
                to="/admin/automations"
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-all"
              >
                <span>Automated Background Audits & Outbox</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-900 to-navy-900 text-white space-y-2 text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-wider block">Startup Mission Reminder</span>
            <p className="text-slate-300 leading-relaxed">
              "We don't just teach robotics. We help students experience, build and understand technology."
            </p>
            <span className="text-[11px] text-cyan-300 block pt-1">
              Initial Target: Velachery, Taramani, Perungudi, OMR & Thiruvanmiyur
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
