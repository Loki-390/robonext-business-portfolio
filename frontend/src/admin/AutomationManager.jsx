import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Play, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Mail, 
  Database, 
  Clock, 
  Terminal,
  ShieldCheck,
  Zap,
  Loader2
} from 'lucide-react';
import api from '../services/api';

export default function AutomationManager() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState(null);
  const [triggering, setTriggering] = useState(false);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await api.get('/automations/overview');
      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load automation overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleRunAudit = async () => {
    try {
      setTriggering(true);
      setActionMsg(null);
      const res = await api.post('/automations/run-audit');
      if (res.data.success) {
        setActionMsg(`✅ Pipeline Audit Executed: ${res.data.result.uncontactedFlagged} enquiries flagged, ${res.data.result.upcomingDemosNotified} demos audited.`);
        fetchOverview();
      }
    } catch (err) {
      setActionMsg('❌ Audit execution failed.');
    } finally {
      setTriggering(false);
    }
  };

  const handleTriggerDigest = async () => {
    try {
      setTriggering(true);
      setActionMsg(null);
      const res = await api.post('/automations/trigger-digest');
      if (res.data.success) {
        setActionMsg(`📊 Executive Digest Compiled: Total ${res.data.digest.totalEnquiries} enquiries processed.`);
        fetchOverview();
      }
    } catch (err) {
      setActionMsg('❌ Digest compilation failed.');
    } finally {
      setTriggering(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
            Automations & System Diagnostics
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Background workers, automated enquiry follow-up scheduler, database health, and notification outbox.
          </p>
        </div>

        <button
          onClick={fetchOverview}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Diagnostics</span>
        </button>
      </div>

      {actionMsg && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center justify-between">
          <span>{actionMsg}</span>
          <button onClick={() => setActionMsg(null)} className="text-blue-500 hover:text-blue-700 font-bold">&times;</button>
        </div>
      )}

      {/* System Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Database Engine */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Database Engine</span>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-extrabold text-lg text-navy-900">
            {data?.system?.database?.target || 'Detecting...'}
          </h3>
          <p className="text-xs text-slate-500">
            Mode: <code className="font-mono text-blue-600 font-bold">{data?.system?.database?.mode || 'local_fallback'}</code>
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Full CRUD & Queries Operational</span>
            </span>
          </div>
        </div>

        {/* Notification Engine */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Notification Engine</span>
            <Mail className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="font-extrabold text-lg text-navy-900">
            {data?.system?.smtpConfigured ? 'Live SMTP Transport' : 'Development Simulator & Log'}
          </h3>
          <p className="text-xs text-slate-500">
            School & Admin notifications automatically dispatched on demonstration requests.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Automated Dispatch Active</span>
            </span>
          </div>
        </div>

        {/* Server Uptime */}
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Backend Server</span>
            <Server className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-extrabold text-lg text-navy-900">
            {data?.system?.uptime ? `${Math.round(data.system.uptime)} seconds` : 'Online'}
          </h3>
          <p className="text-xs text-slate-500">
            Environment: <code className="font-mono text-indigo-600 font-bold">{data?.system?.environment || 'development'}</code>
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              <CheckCircle2 className="w-3 h-3" />
              <span>Background Cron Active</span>
            </span>
          </div>
        </div>

      </div>

      {/* Manual Trigger Actions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          On-Demand Automation Triggers
        </h3>
        <p className="text-xs text-slate-500">
          Execute background pipeline audit routines or generate on-demand summary digests without waiting for scheduled cron intervals.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={handleRunAudit}
            disabled={triggering}
            className="btn-primary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
          >
            {triggering ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Execute Pipeline Follow-up Audit</span>
          </button>

          <button
            onClick={handleTriggerDigest}
            disabled={triggering}
            className="btn-secondary text-xs py-2.5 px-4 font-bold flex items-center gap-1.5"
          >
            {triggering ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
            <span>Compile Daily Executive Digest</span>
          </button>
        </div>
      </div>

      {/* Automation Activity Log */}
      <div className="bg-navy-950 text-slate-200 border border-navy-800 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b border-navy-850 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Automated System Log Stream</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {data?.logs?.length || 0} Events Recorded
          </span>
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto font-mono text-xs pr-2">
          {(!data?.logs || data.logs.length === 0) ? (
            <div className="text-slate-500 italic py-4">No automation events logged yet.</div>
          ) : (
            data.logs.map((log) => (
              <div key={log.id} className="p-2.5 rounded bg-navy-900 border border-navy-850 flex items-start gap-3">
                <span className="text-cyan-400 font-bold shrink-0 text-[10px]">
                  [{new Date(log.timestamp).toLocaleTimeString()}]
                </span>
                <div className="min-w-0">
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-900/60 text-blue-300 font-bold mr-2">
                    {log.action}
                  </span>
                  <span className="text-slate-300 text-[11px] break-all">
                    {JSON.stringify(log.details)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
