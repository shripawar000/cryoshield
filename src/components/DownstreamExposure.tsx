import React from 'react';
import { Building2, Waves, Radio, Video } from 'lucide-react';

interface DownstreamExposureProps {
  onRunSimulation: () => void;
  onDispatchAlert: () => void;
}

export const DownstreamExposure: React.FC<DownstreamExposureProps> = ({
  onRunSimulation,
  onDispatchAlert,
}) => {
  return (
    <div
      id="downstream-exposure-summary-card"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-[#00e5ff]" />
            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              Downstream Exposure Summary
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#bac9cc]">
            Impact footprint calculated within 4-hour hydrodynamic flood wave transit.
          </p>
        </div>

        {/* 4 Key Metric Badges Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
            <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#ffb4ab]">
              14
            </div>
            <div className="text-xs text-[#dfe2ef] font-semibold">
              Settlements in Path
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] truncate">
              Chungthang, Dikchu, Singtam
            </div>
          </div>

          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
            <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#ffb4ab]">
              14,850
            </div>
            <div className="text-xs text-[#dfe2ef] font-semibold">
              Civilian Population
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
              High risk evacuation priority
            </div>
          </div>

          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
            <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#7bd0ff]">
              04
            </div>
            <div className="text-xs text-[#dfe2ef] font-semibold">
              Hydro Plants on Alert
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] truncate">
              Teesta Stage III, IV, V, VI
            </div>
          </div>

          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
            <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#dfe2ef]">
              32 km
            </div>
            <div className="text-xs text-[#dfe2ef] font-semibold">
              Highways &amp; Border Roads
            </div>
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
              NH-10 supply corridor exposed
            </div>
          </div>
        </div>

        {/* Critical Suspension Bridges Callout */}
        <div className="p-3 bg-[#262a34]/60 border border-[#31353f]/40 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video size={16} className="text-[#7bd0ff]" />
            <span className="text-xs font-semibold text-[#dfe2ef]">
              6 Bridges in Direct Flood Path
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#1c1f29] border border-[#262a34] text-[#7bd0ff] font-['JetBrains_Mono'] text-[10px] font-medium">
            2 Suspension
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onRunSimulation}
          className="w-full py-2.5 px-4 rounded-lg bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] hover:scale-[1.01] active:scale-[0.99]"
        >
          <Waves size={16} />
          <span>Run Hydrodynamic Flood Simulation</span>
        </button>

        <button
          type="button"
          onClick={onDispatchAlert}
          className="w-full py-2 px-4 rounded-lg bg-[#93000a] hover:bg-[#93000a]/80 text-[#ffdad6] border border-[#ffb4ab]/40 font-['JetBrains_Mono'] text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(244,63,94,0.3)] hover:scale-[1.01] active:scale-[0.99]"
        >
          <Radio size={15} />
          <span>Broadcast Early Warning SMS to 14,850 Civilians</span>
        </button>
      </div>
    </div>
  );
};
