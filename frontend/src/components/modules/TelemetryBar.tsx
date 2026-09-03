import React, { useEffect, useState } from 'react';
import { Activity, Cpu, HddNetwork, ShieldCheck } from 'react-bootstrap-icons';
import { api } from '../../services/api';
import type { SystemTelemetry } from '../../types';

export const TelemetryBar: React.FC = () => {
  const [telemetry, setTelemetry] = useState<SystemTelemetry | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchTelemetry = async () => {
      try {
        const data = await api.getTelemetry();
        if (mounted) setTelemetry(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (!telemetry) return null;

  return (
    <aside aria-label="Telemetria do Sistema" className="bg-[#050608] border-t border-zinc-800 py-2 px-4 text-[11px] font-mono text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1.5 gap-x-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-zinc-300 font-semibold">INFRASTRUCTURE: NORMAL</span>
          </div>
          <span className="text-zinc-700 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" aria-hidden="true" />
            <span>Uptime: {telemetry.uptime_percent}%</span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-zinc-400">
          <div className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-sky-400" aria-hidden="true" />
            <span>Latency: {telemetry.average_api_latency_ms}ms</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <HddNetwork className="w-3 h-3 text-amber-400" aria-hidden="true" />
            <span>n8n Active Nodes: {telemetry.active_n8n_nodes}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>SSL: {telemetry.ssl_grade}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
