import React from 'react';
import { DOWNSTREAM_ASSETS } from '../../data/lakeData';
import { MapPin, Building2, Zap, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ExposureMapView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
            <MapPin size={16} /> Downstream Vulnerability Cartography
          </div>
          <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
            Downstream Vulnerability &amp; Exposure GIS Network
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
            Detailed asset vulnerability mapping covering critical hydro projects, civil settlements, and military transit routes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded bg-[#93000a] text-[#ffdad6] font-['JetBrains_Mono'] text-xs font-bold uppercase">
            14 Settlements Armed
          </span>
        </div>
      </div>

      {/* Downstream Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DOWNSTREAM_ASSETS.map((asset) => {
          const isHighVuln = asset.vulnerabilityScore >= 80;
          return (
            <div
              key={asset.id}
              className="bg-[#181b25] p-5 rounded-xl border border-[#262a34] hover:border-[#3b494c] transition-all space-y-3 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase">
                  {asset.type}
                </span>
                <span
                  className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase ${
                    isHighVuln
                      ? 'bg-[#93000a] text-[#ffdad6]'
                      : 'bg-[#00374d] text-[#7bd0ff]'
                  }`}
                >
                  Vuln: {asset.vulnerabilityScore}/100
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-[#dfe2ef]">{asset.name}</h3>
                <div className="font-['JetBrains_Mono'] text-xs text-[#bac9cc] mt-0.5">
                  Distance: {asset.distanceFromLakeKm} km downvalley
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#1c1f29] p-2.5 rounded-lg text-xs font-['JetBrains_Mono']">
                <div>
                  <span className="text-[#849396] block text-[10px]">Pop. / Capacity</span>
                  <span className="text-[#dfe2ef] font-semibold">
                    {asset.populationExposed > 0
                      ? `${asset.populationExposed.toLocaleString()} Civilians`
                      : asset.capacity || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-[#849396] block text-[10px]">Wave Arrival ETA</span>
                  <span className="text-[#ffb4ab] font-bold">
                    T + {asset.estimatedArrivalMin} min
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-[#262a34]/60 border border-[#31353f]/30 rounded text-xs space-y-1">
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] uppercase font-semibold">
                  Mitigation Action:
                </div>
                <div className="text-[#bac9cc] leading-tight text-[11px]">
                  {asset.mitigationAction}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
