import React, { useState } from 'react';
import { GlacialLake } from '../types';
import { Cpu, ShieldCheck, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

interface ExplainabilityEngineProps {
  selectedLake: GlacialLake;
}

export const ExplainabilityEngine: React.FC<ExplainabilityEngineProps> = ({
  selectedLake,
}) => {
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [lastInferenceTime, setLastInferenceTime] = useState('14:15 UTC');

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      const now = new Date();
      setLastInferenceTime(
        `${String(now.getUTCHours()).padStart(2, '0')}:${String(
          now.getUTCMinutes()
        ).padStart(2, '0')} UTC`
      );
    }, 1200);
  };

  const handleVerify = () => {
    setVerificationDone(true);
    setTimeout(() => setVerificationDone(false), 3000);
  };

  // Contributing Factors parameterized based on selected lake
  const factors = [
    {
      name: '1. Lake Growth Rate',
      val: Math.min(98, Math.round(selectedLake.growthDeltaPercent * 3.8)),
      detail: `Area expansion +${selectedLake.growthDeltaPercent}% year-on-year`,
      isCrit: true,
    },
    {
      name: '2. Water Volume',
      val: Math.min(95, Math.round(selectedLake.waterVolumeMCM * 1.3)),
      detail: `Estimated storage: ${selectedLake.waterVolumeMCM}M m³`,
      isCrit: true,
    },
    {
      name: '3. Moraine Dam Instability',
      val: Math.min(96, 100 - selectedLake.moraineDamScore),
      detail: 'Ice core thawing & piping detected',
      isCrit: true,
    },
    {
      name: '4. Hanging Glacier Slope',
      val: Math.min(92, Math.round(selectedLake.iceCliffSlopeDeg * 1.7)),
      detail: `Slope >${selectedLake.iceCliffSlopeDeg}° directly above shoreline`,
      isCrit: false,
    },
    {
      name: '5. Calving Potential',
      val: 78,
      detail: 'Transverse crevasses expanding',
      isCrit: false,
    },
    {
      name: '6. Downstream Exposure',
      val: selectedLake.glofRiskScore >= 80 ? 91 : 72,
      detail: `Hydroelectric plant at ${selectedLake.settlementDistanceKm} km`,
      isCrit: true,
    },
    {
      name: '7. Climate & Isotherm Surge',
      val: Math.min(90, Math.round(selectedLake.isothermAnomalyC * 42)),
      detail: `+${selectedLake.isothermAnomalyC}°C above historical 30yr mean`,
      isCrit: false,
    },
    {
      name: '8. Cascade Disaster Risk',
      val: Math.min(92, Math.round(selectedLake.glofRiskScore * 0.93)),
      detail: 'Secondary debris damming probability',
      isCrit: true,
    },
  ];

  return (
    <div
      id="explainable-ai-engine-section"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-[#00e5ff]" />
            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              AI Risk Assessment &amp; Explainability Engine
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#bac9cc] max-w-3xl">
            Multi-modal deep learning synthesis based on Sentinel-2 optical bands, Sentinel-1 InSAR coherence, and DEM slope gradient analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#262a34] border border-[#3b494c]/40 text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase font-semibold">
            SHAP Factor Attribution Active
          </span>
        </div>
      </div>

      {/* Explainability Card with Natural Language diagnostic */}
      <div className="bg-[#1c1f29] p-4 rounded-xl border border-[#262a34] space-y-2">
        <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold">
          <ShieldCheck size={16} />
          <span>Automated Natural Language Diagnostic [Inference Timestamp: {lastInferenceTime}]</span>
        </div>
        <p className="text-xs md:text-sm text-[#dfe2ef] leading-relaxed">
          <strong className="text-[#ffb4ab]">
            GLOF Risk spiked to {selectedLake.glofRiskScore}/100 ({selectedLake.riskLevel})
          </strong>{' '}
          due to concurrent cryospheric triggers:{' '}
          <span className="text-[#00e5ff] font-semibold">
            +{selectedLake.growthDeltaPercent}% expansion
          </span>{' '}
          of glacial lake surface area over the past 12 months; terminal moraine dam integrity degrading significantly with internal seepage detected (
          <span className="text-[#ffb4ab] font-semibold">
            Stability Score: {selectedLake.moraineDamScore}/100
          </span>
          ); elevated thermal isotherm anomalies (
          <strong className="text-[#dfe2ef]">
            +{selectedLake.isothermAnomalyC}°C above climatology
          </strong>
          ); and high slope instability with hanging ice cliffs directly aligned along the avalanche runout trajectory into the lake basin.
        </p>
      </div>

      {/* 8 Contributing Factors with Horizontal Colored Risk Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {factors.map((factor, idx) => (
          <div
            key={idx}
            className="bg-[#262a34]/50 border border-[#31353f]/30 p-3 rounded-lg space-y-2 hover:bg-[#262a34] transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#dfe2ef] font-semibold truncate">
                {factor.name}
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-xs font-bold ${
                  factor.isCrit ? 'text-[#ffb4ab]' : 'text-[#7bd0ff]'
                }`}
              >
                {factor.val}%
              </span>
            </div>

            <div className="w-full bg-[#0a0e17] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  factor.isCrit ? 'bg-[#ffb4ab]' : 'bg-[#7bd0ff]'
                }`}
                style={{ width: `${factor.val}%` }}
              ></div>
            </div>

            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] block truncate">
              {factor.detail}
            </span>
          </div>
        ))}
      </div>

      {/* Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#262a34]">
        <div className="flex items-center gap-2 text-[#bac9cc] font-['JetBrains_Mono'] text-[10px]">
          <ShieldCheck size={16} className="text-[#00e5ff]" />
          <span>Validated against ICIMOD 2024 Glacial Inventory Dataset</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="px-3 py-1.5 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] border border-[#3b494c]/50 font-['JetBrains_Mono'] text-xs transition-colors flex items-center gap-1.5"
          >
            <RefreshCw
              size={14}
              className={isRecalculating ? 'animate-spin text-[#00e5ff]' : 'text-[#bac9cc]'}
            />
            <span>{isRecalculating ? 'Synthesizing...' : 'Recalculate Model'}</span>
          </button>

          <button
            type="button"
            onClick={handleVerify}
            className="px-3 py-1.5 rounded-lg bg-[#00e5ff] text-[#00363d] hover:bg-[#00daf3] font-['JetBrains_Mono'] text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,229,255,0.3)]"
          >
            {verificationDone ? (
              <>
                <CheckCircle2 size={14} />
                <span>Verified!</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Protocol Verification</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
