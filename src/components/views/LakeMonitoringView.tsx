import React, { useState } from 'react';
import { GlacialLake } from '../../types';
import { Waves, Search, ArrowUpRight, ShieldAlert, Layers } from 'lucide-react';

interface LakeMonitoringViewProps {
  lakes: GlacialLake[];
  selectedLake: GlacialLake;
  onSelectLake: (lake: GlacialLake) => void;
}

export const LakeMonitoringView: React.FC<LakeMonitoringViewProps> = ({
  lakes,
  selectedLake,
  onSelectLake,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = lakes.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
            <Waves size={16} /> Bathymetric &amp; Cryosphere Telemetry
          </div>
          <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
            Glacial Lake Monitoring &amp; Bathymetric Profiler
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
            Continuous satellite edge-tracking of 1,428 Himalayan proglacial &amp; moraine-dammed water bodies.
          </p>
        </div>

        <div className="relative">
          <Search size={15} className="absolute left-2.5 top-2.5 text-[#849396]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter lakes..."
            className="pl-8 pr-3 py-1.5 bg-[#1c1f29] border border-[#262a34] rounded-lg text-xs text-[#dfe2ef] focus:outline-none focus:ring-1 focus:ring-[#00e5ff] w-56"
          />
        </div>
      </div>

      {/* 2-Column Detail: Lake Grid and Selected Lake Bathymetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lake Cards List */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((lake) => {
            const isSelected = lake.id === selectedLake.id;
            const isCrit = lake.glofRiskScore >= 80;
            return (
              <div
                key={lake.id}
                onClick={() => onSelectLake(lake)}
                className={`p-4 rounded-xl border transition-all cursor-pointer bg-[#181b25] flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'border-[#00e5ff] shadow-[0_0_16px_rgba(0,229,255,0.25)] ring-1 ring-[#00e5ff]'
                    : 'border-[#262a34] hover:border-[#3b494c] hover:bg-[#1c1f29]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] uppercase">
                    {lake.code}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase ${
                      isCrit
                        ? 'bg-[#93000a] text-[#ffdad6]'
                        : 'bg-[#00374d] text-[#7bd0ff]'
                    }`}
                  >
                    Risk {lake.glofRiskScore}/100
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-[#dfe2ef]">{lake.name}</h3>
                  <div className="text-xs text-[#bac9cc]">{lake.region}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-['JetBrains_Mono'] bg-[#1c1f29] p-2 rounded">
                  <div>
                    <span className="text-[#849396] block">Surface Area</span>
                    <span className="text-[#dfe2ef] font-semibold">{lake.surfaceAreaKm2} km²</span>
                  </div>
                  <div>
                    <span className="text-[#849396] block">Water Volume</span>
                    <span className="text-[#dfe2ef] font-semibold">{lake.waterVolumeMCM}M m³</span>
                  </div>
                  <div>
                    <span className="text-[#849396] block">Freeboard</span>
                    <span className="text-[#ffb4ab] font-semibold">{lake.freeboardMeters} m</span>
                  </div>
                  <div>
                    <span className="text-[#849396] block">Elevation</span>
                    <span className="text-[#dfe2ef] font-semibold">{lake.elevation} m</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[#bac9cc] pt-1 border-t border-[#262a34]">
                  <span>Sensor: {lake.satelliteSource}</span>
                  <span className="flex items-center gap-1 text-[#00e5ff]">
                    Details <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Lake Deep Bathymetric Profile */}
        <div className="lg:col-span-5 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase">
              DEEP BATHYMETRIC PROFILE
            </span>
            <span className="font-['JetBrains_Mono'] text-xs text-[#bac9cc]">
              {selectedLake.coordinates}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#dfe2ef]">{selectedLake.name}</h2>
            <div className="text-xs text-[#bac9cc] mt-0.5">{selectedLake.region}</div>
          </div>

          {/* Synthetic Bathymetric Cross-Section SVG */}
          <div className="p-3 bg-[#0a0e17] rounded-xl border border-[#262a34] relative">
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] mb-2 flex items-center justify-between">
              <span>ELEVATION CROSS-SECTION (5,200m - 5,080m)</span>
              <span>DEPTH MAX: 92m</span>
            </div>
            <svg className="w-full h-44" viewBox="0 0 400 160">
              <defs>
                <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#00354a" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="moraineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#353943" />
                  <stop offset="100%" stopColor="#1c1f29" />
                </linearGradient>
              </defs>

              {/* Water body */}
              <polygon
                points="70,55 330,55 315,135 120,140 70,55"
                fill="url(#waterGrad)"
                stroke="#00e5ff"
                strokeWidth="1.5"
              />

              {/* Rocky Moraine Dam & Glacial Bed */}
              <path
                d="M 10,20 L 70,55 L 120,140 L 315,135 L 330,55 L 390,25 L 400,160 L 0,160 Z"
                fill="url(#moraineGrad)"
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Ice Core Piping Seepage Points */}
              <circle cx="330" cy="75" r="4" fill="#ffb4ab" className="animate-ping" />
              <circle cx="330" cy="75" r="3" fill="#ffb4ab" />
              <line x1="330" y1="75" x2="370" y2="95" stroke="#ffb4ab" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="310" y="115" fill="#ffb4ab" fontSize="9" fontFamily="JetBrains Mono">
                Internal Seepage
              </text>

              {/* Freeboard indicator */}
              <line x1="60" y1="20" x2="60" y2="55" stroke="#7bd0ff" strokeWidth="1" strokeDasharray="2 2" />
              <text x="15" y="40" fill="#7bd0ff" fontSize="9" fontFamily="JetBrains Mono">
                Freeboard 4.5m
              </text>
            </svg>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] uppercase font-semibold flex items-center gap-1">
                <ShieldAlert size={14} /> Moraine Geomechanical Integrity
              </div>
              <p className="text-[#bac9cc] leading-relaxed">
                Terminal moraine width-to-height ratio has degraded to 1.8:1. Internal acoustic sensors detect active piping void migration beneath the eastern crest.
              </p>
            </div>

            <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] uppercase font-semibold flex items-center gap-1">
                <Layers size={14} /> Autonomous Satellite Edge Detection
              </div>
              <p className="text-[#bac9cc] leading-relaxed">
                Sentinel-2 NDWI (Normalized Difference Water Index) processing detects continuous shoreline advancement toward unstable debris talus slopes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
