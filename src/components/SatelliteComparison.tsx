import React, { useState } from 'react';
import { SATELLITE_COMPARISON_DATA } from '../data/lakeData';
import { History, Eye, EyeOff } from 'lucide-react';

export const SatelliteComparison: React.FC = () => {
  const [showPolygons, setShowPolygons] = useState(true);
  const data = SATELLITE_COMPARISON_DATA;

  return (
    <div
      id="satellite-temporal-comparison-section"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <History size={20} className="text-[#00e5ff]" />
            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              Satellite Multi-Temporal Change Detection (2024 → 2025 → 2026)
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#bac9cc]">
            Comparative Sentinel-2 optical analysis documenting rapid lake boundary polygon expansion and terminus retreat.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPolygons(!showPolygons)}
            className="px-2.5 py-1 rounded bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] border border-[#3b494c]/50 font-['JetBrains_Mono'] text-[11px] flex items-center gap-1.5 transition-colors"
          >
            {showPolygons ? <Eye size={13} className="text-[#00e5ff]" /> : <EyeOff size={13} className="text-[#849396]" />}
            <span>{showPolygons ? 'Polygons On' : 'Polygons Off'}</span>
          </button>
          <span className="px-3 py-1 rounded-lg bg-[#262a34] border border-[#3b494c]/40 text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase font-semibold">
            Resolution: 10m Ground Sample
          </span>
        </div>
      </div>

      {/* 3-Panel Visual Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Year 1: 2024 */}
        <div className="bg-[#1c1f29] rounded-xl overflow-hidden border border-[#262a34] shadow-sm flex flex-col group">
          <div className="relative h-56 bg-[#0a0e17] overflow-hidden">
            <img
              src={data.baseline2024.imageUrl}
              alt="High altitude satellite imagery of Himalayan South Lhonak glacial lake in 2024"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {showPolygons && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
                <polygon
                  points="90,130 110,80 150,70 190,95 180,140 120,145"
                  fill="#00e5ff"
                  fillOpacity="0.3"
                  stroke="#00e5ff"
                  strokeWidth="2"
                />
              </svg>
            )}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0a0e17]/85 backdrop-blur-sm font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] font-semibold border border-[#00e5ff]/30">
              {data.baseline2024.date}
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0a0e17]/85 backdrop-blur-sm font-['JetBrains_Mono'] text-xs text-[#dfe2ef] border border-[#262a34]">
              {data.baseline2024.area}
            </div>
          </div>

          <div className="p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#dfe2ef]">
                {data.baseline2024.status}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff]">
                {data.baseline2024.satellite}
              </span>
            </div>
            <p className="text-xs text-[#bac9cc] leading-relaxed">
              {data.baseline2024.description}
            </p>
          </div>
        </div>

        {/* Year 2: 2025 */}
        <div className="bg-[#1c1f29] rounded-xl overflow-hidden border border-[#262a34] shadow-sm flex flex-col group">
          <div className="relative h-56 bg-[#0a0e17] overflow-hidden">
            <img
              src={data.intermediate2025.imageUrl}
              alt="Satellite thermal infrared perspective of expanding glacial lake in 2025"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {showPolygons && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
                <polygon
                  points="80,135 105,75 165,60 210,90 205,150 115,155"
                  fill="#7bd0ff"
                  fillOpacity="0.35"
                  stroke="#7bd0ff"
                  strokeWidth="2"
                />
              </svg>
            )}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0a0e17]/85 backdrop-blur-sm font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] font-semibold border border-[#7bd0ff]/30">
              {data.intermediate2025.date}
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0a0e17]/85 backdrop-blur-sm font-['JetBrains_Mono'] text-xs text-[#dfe2ef] border border-[#262a34]">
              {data.intermediate2025.area} ({data.intermediate2025.delta})
            </div>
          </div>

          <div className="p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#dfe2ef]">
                {data.intermediate2025.status}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff]">
                {data.intermediate2025.satellite}
              </span>
            </div>
            <p className="text-xs text-[#bac9cc] leading-relaxed">
              {data.intermediate2025.description}
            </p>
          </div>
        </div>

        {/* Year 3: 2026 (Critical Current) */}
        <div className="bg-[#1c1f29] rounded-xl overflow-hidden border border-[#ffb4ab]/40 shadow-lg shadow-red-950/20 flex flex-col group ring-1 ring-[#ffb4ab]/30">
          <div className="relative h-56 bg-[#0a0e17] overflow-hidden">
            <img
              src={data.current2026.imageUrl}
              alt="Extreme close-up satellite false color imagery showing critical glacial lake expansion in 2026"
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {showPolygons && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 200">
                <polygon
                  points="70,140 100,68 180,52 230,85 225,160 105,165"
                  fill="#ffb4ab"
                  fillOpacity="0.45"
                  stroke="#ffb4ab"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              </svg>
            )}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-['JetBrains_Mono'] text-[10px] font-bold uppercase flex items-center gap-1.5 shadow-[0_0_10px_#93000a]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping"></span>
              <span>{data.current2026.date}</span>
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#0a0e17]/90 backdrop-blur-sm font-['JetBrains_Mono'] text-xs text-[#ffb4ab] font-bold border border-[#ffb4ab]/40">
              {data.current2026.area} ({data.current2026.delta})
            </div>
          </div>

          <div className="p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#ffb4ab]">
                {data.current2026.status}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] font-semibold">
                {data.current2026.satellite}
              </span>
            </div>
            <p className="text-xs text-[#bac9cc] leading-relaxed">
              {data.current2026.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
