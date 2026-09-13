import React, { useState } from 'react';
import { Radio, AlertOctagon, Bell, CheckCircle2, Volume2, ShieldAlert } from 'lucide-react';

interface AlertCenterViewProps {
  onDispatchAlert: () => void;
}

export const AlertCenterView: React.FC<AlertCenterViewProps> = ({
  onDispatchAlert,
}) => {
  const [sirenActive, setSirenActive] = useState(false);

  const incidents = [
    {
      time: '14:28:10 UTC',
      level: 'CRITICAL',
      title: 'Moraine crest acoustic displacement anomaly detected at Lake South Lhonak',
      action: 'Automated notification dispatched to Teesta Stage III spillway gate team',
    },
    {
      time: '13:50:22 UTC',
      level: 'WARNING',
      title: 'Surface area delta exceeded +24% threshold from Sentinel-2 MSI ingest',
      action: 'Model automatically promoted lake threat level to Severe (Level 5)',
    },
    {
      time: '11:14:05 UTC',
      level: 'INFO',
      title: 'Sentinel-1 InSAR synthetic aperture radar coherence updated',
      action: 'Verified cryogenic surface velocity baseline across Sikkim Sector 04',
    },
    {
      time: '08:30:00 UTC',
      level: 'INFO',
      title: 'Daily automated early warning acoustic siren diagnostic check passed (18/18 nodes online)',
      action: 'Chungthang, Dikchu, Singtam, Rangpo repeater towers green',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
            <Radio size={16} /> National Civil Defence Command
          </div>
          <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
            Early Warning Siren Network &amp; Cell Broadcast Center
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
            Autonomous emergency siren triggers and real-time civil defence broadcast dispatch.
          </p>
        </div>

        <button
          type="button"
          onClick={onDispatchAlert}
          className="px-4 py-2.5 rounded-lg bg-[#93000a] hover:bg-[#93000a]/80 text-[#ffdad6] border border-[#ffb4ab]/40 font-['JetBrains_Mono'] text-xs font-bold uppercase flex items-center gap-2 transition-all shadow-lg shadow-red-950/40"
        >
          <AlertOctagon size={16} />
          <span>Dispatch Emergency Broadcast</span>
        </button>
      </div>

      {/* Grid: Sirens & Incident Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Siren Status Nodes (5 cols) */}
        <div className="lg:col-span-5 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#dfe2ef] flex items-center gap-2">
              <Volume2 size={18} className="text-[#00e5ff]" />
              Acoustic Siren Arrays
            </h2>
            <span className="px-2 py-0.5 rounded bg-[#00363d] text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] font-bold">
              18/18 ONLINE
            </span>
          </div>

          <div className="space-y-2">
            {[
              { name: 'Chungthang Hub Array A1', status: 'ARMED', dist: '14.2 km' },
              { name: 'Chungthang Dam Spillway S1', status: 'ARMED', dist: '15.0 km' },
              { name: 'Mangan Civil Tower M1', status: 'ARMED', dist: '38.4 km' },
              { name: 'Dikchu Bridge Array D1', status: 'ARMED', dist: '52.1 km' },
              { name: 'Singtam Valley Alert Horn', status: 'ARMED', dist: '68.0 km' },
            ].map((node, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded bg-[#1c1f29] border border-[#262a34] text-xs font-['JetBrains_Mono']"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
                  <span className="text-[#dfe2ef]">{node.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#bac9cc] text-[10px]">{node.dist}</span>
                  <span className="text-[#00e5ff] font-bold text-[10px]">{node.status}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSirenActive(!sirenActive)}
            className={`w-full py-2.5 px-4 rounded-lg font-['JetBrains_Mono'] text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 ${
              sirenActive
                ? 'bg-[#ffb4ab] text-[#690005] animate-pulse'
                : 'bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] border border-[#3b494c]/40'
            }`}
          >
            <ShieldAlert size={16} />
            <span>{sirenActive ? 'SILENCE TEST AUDIO' : 'TEST ACOUSTIC TONE (3 SEC)'}</span>
          </button>
        </div>

        {/* Live Incident Log (7 cols) */}
        <div className="lg:col-span-7 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#dfe2ef] flex items-center gap-2">
              <Bell size={18} className="text-[#00e5ff]" />
              Live Incident &amp; Telemetry Feed
            </h2>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
              FILTER: ALL CHANNELS
            </span>
          </div>

          <div className="space-y-3">
            {incidents.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#1c1f29] border border-[#262a34] space-y-1.5"
              >
                <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px]">
                  <span
                    className={`px-2 py-0.5 rounded font-bold uppercase ${
                      item.level === 'CRITICAL'
                        ? 'bg-[#93000a] text-[#ffdad6]'
                        : item.level === 'WARNING'
                        ? 'bg-[#00374d] text-[#7bd0ff]'
                        : 'bg-[#262a34] text-[#bac9cc]'
                    }`}
                  >
                    {item.level}
                  </span>
                  <span className="text-[#bac9cc]">{item.time}</span>
                </div>

                <div className="text-xs font-semibold text-[#dfe2ef]">{item.title}</div>
                <div className="text-[11px] text-[#bac9cc] font-['JetBrains_Mono']">
                  ↳ {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
