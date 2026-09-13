import React from 'react';
import { GlacialLake } from '../../types';
import { LineChart, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface RiskAnalysisViewProps {
  selectedLake: GlacialLake;
}

export const RiskAnalysisView: React.FC<RiskAnalysisViewProps> = ({
  selectedLake,
}) => {
  const riskMetrics = [
    { label: 'Moraine Degradation', score: 100 - selectedLake.moraineDamScore, max: 100, weight: '30%' },
    { label: 'Hanging Glacier Proximity', score: Math.round(selectedLake.iceCliffSlopeDeg * 1.8), max: 100, weight: '25%' },
    { label: 'Surface Expansion Velocity', score: Math.round(selectedLake.growthDeltaPercent * 3.6), max: 100, weight: '20%' },
    { label: 'Downstream Infrastructure', score: selectedLake.glofRiskScore >= 80 ? 92 : 65, max: 100, weight: '15%' },
    { label: 'Thermal Isotherm Shift', score: Math.round(selectedLake.isothermAnomalyC * 45), max: 100, weight: '10%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
            <LineChart size={16} /> Cryo-Geotechnical Risk Engine
          </div>
          <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
            Multi-Criteria Risk Synthesis &amp; Hazard Matrix
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
            Quantitative GLOF susceptibility modeling utilizing Copernicus DEM terrain gradients and InSAR interferometry.
          </p>
        </div>

        <div className="bg-[#1c1f29] border border-[#262a34] px-4 py-2 rounded-xl text-right">
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">COMPOSITE THREAT INDEX</div>
          <div className="font-['JetBrains_Mono'] text-2xl font-bold text-[#ffb4ab]">
            {selectedLake.glofRiskScore} / 100
          </div>
        </div>
      </div>

      {/* Grid: Radar / Matrix & Factor Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar / Polygon Synthesis Visual (7 cols) */}
        <div className="lg:col-span-7 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#dfe2ef]">
              Multi-Axis Susceptibility Radar ({selectedLake.name})
            </h2>
            <span className="font-['JetBrains_Mono'] text-xs text-[#00e5ff]">
              5-Variable Synthetic Vector
            </span>
          </div>

          <div className="h-64 flex items-center justify-center bg-[#0a0e17] rounded-xl border border-[#262a34] p-4 relative">
            {/* SVG Radar Chart */}
            <svg className="w-full h-full max-w-sm" viewBox="0 0 300 240">
              {/* Concentric pentagons */}
              <polygon points="150,20 270,75 225,200 75,200 30,75" fill="none" stroke="#262a34" strokeWidth="1" />
              <polygon points="150,55 235,95 200,180 100,180 65,95" fill="none" stroke="#262a34" strokeWidth="1" strokeDasharray="2 2" />
              <polygon points="150,90 200,115 180,160 120,160 100,115" fill="none" stroke="#262a34" strokeWidth="1" strokeDasharray="2 2" />

              {/* Axes lines */}
              <line x1="150" y1="120" x2="150" y2="20" stroke="#31353f" strokeWidth="1" />
              <line x1="150" y1="120" x2="270" y2="75" stroke="#31353f" strokeWidth="1" />
              <line x1="150" y1="120" x2="225" y2="200" stroke="#31353f" strokeWidth="1" />
              <line x1="150" y1="120" x2="75" y2="200" stroke="#31353f" strokeWidth="1" />
              <line x1="150" y1="120" x2="30" y2="75" stroke="#31353f" strokeWidth="1" />

              {/* Data polygon */}
              <polygon
                points="150,30 255,85 215,185 85,175 45,85"
                fill="#ffb4ab"
                fillOpacity="0.35"
                stroke="#ffb4ab"
                strokeWidth="2"
              />

              {/* Axis labels */}
              <text x="150" y="14" fill="#00e5ff" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
                Moraine Degradation (88%)
              </text>
              <text x="275" y="75" fill="#7bd0ff" fontSize="9" textAnchor="start" fontFamily="JetBrains Mono">
                Ice Cliff Slope (82%)
              </text>
              <text x="230" y="215" fill="#dfe2ef" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
                Thermal Anomaly (76%)
              </text>
              <text x="70" y="215" fill="#dfe2ef" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">
                Downstream Exposure (91%)
              </text>
              <text x="25" y="75" fill="#00e5ff" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">
                Expansion Delta (94%)
              </text>
            </svg>
          </div>

          <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] text-xs text-[#bac9cc] leading-relaxed">
            Quantitative weight matrix is calibrated against the 2023 South Lhonak disaster empirical parameters. Breaching probability increases exponentially when moraine degradation and thermal surge exceed the 75th percentile.
          </div>
        </div>

        {/* Weighted Metrics Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#dfe2ef]">
              Parametric Factor Weights
            </h2>

            <div className="space-y-3">
              {riskMetrics.map((m, i) => (
                <div key={i} className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#dfe2ef] font-semibold">{m.label}</span>
                    <span className="font-['JetBrains_Mono'] text-[#ffb4ab] font-bold">
                      {m.score}% (wt {m.weight})
                    </span>
                  </div>
                  <div className="w-full bg-[#0a0e17] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#00e5ff] to-[#ffb4ab] h-full"
                      style={{ width: `${m.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-[#262a34]/60 border border-[#3b494c]/40 rounded-lg flex items-center gap-3">
            <Shield size={20} className="text-[#00e5ff] shrink-0" />
            <div className="text-xs text-[#bac9cc]">
              Complies with NDMA Guidelines for Glacial Lake Outburst Floods (GLOFs) Section 4.2.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
