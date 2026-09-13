import React from 'react';
import { Thermometer, CloudRain, Flame, TrendingUp } from 'lucide-react';

export const ClimateTrendsView: React.FC = () => {
  const trends = [
    {
      title: 'Freezing Level (0°C Isotherm) Elevation Shift',
      current: '5,850m',
      baseline: '5,450m (1990 Baseline)',
      delta: '+400m upward migration',
      impact: 'Rapid melting of hanging glacier ice-cores at high alpine crests.',
    },
    {
      title: 'Himalayan Regional Temperature Anomaly',
      current: '+1.8°C',
      baseline: '30-Year Climatological Mean',
      delta: 'Accelerating (+0.4°C/decade)',
      impact: 'Twice the global average warming rate (Elevation Dependent Warming).',
    },
    {
      title: 'Monsoon Cloudburst Frequency',
      current: '3.8 Events / yr',
      baseline: '1.2 Events / yr (Historical)',
      delta: '+216% incidence rate',
      impact: 'Intense short-duration rainfall over-saturates terminal moraine dams.',
    },
    {
      title: 'Glacial Tongue Terminus Retreat Rate',
      current: '34.2 m / year',
      baseline: '14.5 m / year (2000-2010)',
      delta: '+135% retreat acceleration',
      impact: 'Rapid expansion of proglacial lake basins across Sikkim and Nepal.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md">
        <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
          <Thermometer size={16} /> Cryospheric Climate Analytics
        </div>
        <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
          Himalayan Climate Anomalies &amp; Permafrost Thaw Trends
        </h1>
        <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
          Synthesized from ECMWF ERA5 reanalysis and automated high-altitude weather stations (AWS).
        </p>
      </div>

      {/* 4 Major Trend Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#181b25] p-5 rounded-xl border border-[#262a34] space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#dfe2ef]">{t.title}</h3>
              <TrendingUp size={16} className="text-[#ffb4ab]" />
            </div>

            <div className="flex items-baseline gap-3 bg-[#1c1f29] p-3 rounded-lg">
              <span className="font-['JetBrains_Mono'] text-3xl font-extrabold text-[#ffb4ab]">
                {t.current}
              </span>
              <div>
                <span className="text-xs text-[#00e5ff] font-semibold block">{t.delta}</span>
                <span className="text-[10px] text-[#849396] font-['JetBrains_Mono']">
                  vs {t.baseline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#bac9cc] leading-relaxed">
              <strong className="text-[#dfe2ef]">Impact: </strong>
              {t.impact}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
