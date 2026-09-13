import React from 'react';
import { Database, ShieldCheck } from 'lucide-react';

export const DataProvenance: React.FC = () => {
  const sources = [
    { name: 'Sentinel-2 MSI (ESA)', detail: '10m Multispectral' },
    { name: 'Copernicus GLO-30 DEM', detail: '30m Elevation Grid' },
    { name: 'Sentinel-1 SAR / InSAR', detail: 'Surface Coherence' },
    { name: 'ICIMOD Glacial DB', detail: '2024 Cryo Baseline' },
    { name: 'ECMWF ERA5 Reanalysis', detail: 'Isotherm & Precip' },
    { name: 'WorldPop & OpenStreetMap', detail: 'Civilian Settlements' },
  ];

  return (
    <div
      id="data-sources-provenance-card"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Database size={20} className="text-[#00e5ff]" />
          <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
            Data Sources &amp; Provenance
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#bac9cc]">
          Multi-source satellite constellation telemetry pipelines.
        </p>
      </div>

      <div className="space-y-1.5 font-['JetBrains_Mono'] text-xs">
        {sources.map((src, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2.5 rounded bg-[#1c1f29] border border-[#262a34] hover:bg-[#262a34]/60 transition-colors"
          >
            <span className="text-[#dfe2ef]">{src.name}</span>
            <span className="text-[#00e5ff] font-medium">{src.detail}</span>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="p-3 bg-[#262a34]/60 border border-[#3b494c]/40 rounded-lg flex items-center gap-3">
          <ShieldCheck size={22} className="text-[#00e5ff] shrink-0" />
          <div className="text-xs text-[#bac9cc] leading-relaxed">
            System verified for zero-latency civil defence dispatch. All telemetry cryptographically signed.
          </div>
        </div>
      </div>
    </div>
  );
};
