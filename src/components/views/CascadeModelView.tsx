import React from 'react';
import { CascadeDisasterModel } from '../CascadeDisasterModel';
import { GitFork, Activity } from 'lucide-react';

export const CascadeModelView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md">
        <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
          <GitFork size={16} /> Cascading Catastrophe Synthesis
        </div>
        <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
          Cascade Disaster Propagation &amp; Debris Bulking Engine
        </h1>
        <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
          Modeling non-linear interaction between glacial calving, moraine breaching, hyperconcentrated debris flow, and downstream barrier damming.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <CascadeDisasterModel />
        </div>

        <div className="lg:col-span-5 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
          <h3 className="text-base font-bold text-[#dfe2ef] flex items-center gap-2">
            <Activity size={18} className="text-[#00e5ff]" /> Hydrograph Wave Attenuation
          </h3>

          <div className="h-56 bg-[#0a0e17] rounded-xl border border-[#262a34] p-3 flex flex-col justify-between">
            <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#00e5ff]">
              <span>PEAK DISCHARGE Q (m³/s)</span>
              <span>12,400 m³/s AT T+18M</span>
            </div>

            {/* SVG Hydrograph Curve */}
            <svg className="w-full h-36" viewBox="0 0 320 120">
              <defs>
                <linearGradient id="hydroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffb4ab" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 10,110 L 40,105 L 70,20 L 110,40 L 160,70 L 220,95 L 310,110 L 10,110 Z"
                fill="url(#hydroGrad)"
              />
              <path
                d="M 10,110 L 40,105 L 70,20 L 110,40 L 160,70 L 220,95 L 310,110"
                fill="none"
                stroke="#ffb4ab"
                strokeWidth="2.5"
              />
              <circle cx="70" cy="20" r="4" fill="#ffb4ab" className="animate-ping" />
              <circle cx="70" cy="20" r="3" fill="#ffdad6" />
              <text x="75" y="22" fill="#ffdad6" fontSize="9" fontFamily="JetBrains Mono">
                Peak Breach Peak
              </text>
            </svg>

            <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#849396]">
              <span>T=0 (Breach)</span>
              <span>T+1h</span>
              <span>T+2h</span>
              <span>T+4h</span>
            </div>
          </div>

          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] text-xs text-[#bac9cc] space-y-1">
            <div className="font-bold text-[#dfe2ef]">Debris Entrainment Factor: 2.8x</div>
            <p className="leading-relaxed">
              As the clean glacial floodwater rushes down the steep moraine valley gradient (slope &gt;25°), it mobilizes 1.8x its original volume in moraine gravel, boulders, and silt, generating high-density destructive debris slurry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
