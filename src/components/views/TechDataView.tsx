import React from 'react';
import { DataProvenance } from '../DataProvenance';
import { Database, Radio, CheckCircle, Server } from 'lucide-react';

export const TechDataView: React.FC = () => {
  const telemetryChannels = [
    { source: 'Sentinel-2A / 2B MSI', status: 'ACTIVE INGEST', latency: '42ms', cadence: '5-Day Revisit' },
    { source: 'Sentinel-1A SAR (C-Band)', status: 'ACTIVE INGEST', latency: '68ms', cadence: '12-Day InSAR Coherence' },
    { source: 'Copernicus GLO-30 DEM', status: 'ACTIVE INGEST', latency: '12ms', cadence: 'Static 30m Grid' },
    { source: 'ECMWF ERA5 Reanalysis', status: 'ACTIVE INGEST', latency: '110ms', cadence: 'Hourly Re-grid' },
    { source: 'Teesta Hydro Gauge Network', status: 'STREAMING', latency: '8ms', cadence: 'Real-Time 1-Sec' },
    { source: 'ISRO RISAT-1A Microwave', status: 'STANDBY POLLING', latency: '95ms', cadence: 'On-Demand Tasking' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md">
        <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
          <Database size={16} /> Constellation Data Pipelines
        </div>
        <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
          Satellite Constellation Pipeline &amp; Edge Ingest Status
        </h1>
        <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
          Cryptographically signed telemetry links connecting ESA Copernicus, ISRO, and ground acoustic siren networks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
            <h2 className="text-base font-bold text-[#dfe2ef] flex items-center gap-2">
              <Server size={18} className="text-[#00e5ff]" />
              Sensor Pipeline Telemetry Feeds
            </h2>

            <div className="space-y-2 font-['JetBrains_Mono'] text-xs">
              {telemetryChannels.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
                    <span className="text-[#dfe2ef] font-semibold">{ch.source}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-[#bac9cc]">{ch.cadence}</span>
                    <span className="text-[#849396]">Latency: {ch.latency}</span>
                    <span className="px-2 py-0.5 rounded bg-[#00363d] text-[#00e5ff] font-bold text-[10px]">
                      {ch.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <DataProvenance />
        </div>
      </div>
    </div>
  );
};
