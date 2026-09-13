import React from 'react';
import { GlacialLake } from '../types';
import { AlertCircle, Radio, Waves, FileDown } from 'lucide-react';

interface LakeInspectorProps {
  lake: GlacialLake;
  onDispatchAlert: () => void;
  onRunSimulation: () => void;
  onOpenDossier: () => void;
}

export const LakeInspector: React.FC<LakeInspectorProps> = ({
  lake,
  onDispatchAlert,
  onRunSimulation,
  onOpenDossier,
}) => {
  const isCrit = lake.glofRiskScore >= 80;
  const isHigh = lake.glofRiskScore >= 60 && lake.glofRiskScore < 80;

  const scoreColor = isCrit
    ? 'text-[#ffb4ab]'
    : isHigh
    ? 'text-[#7bd0ff]'
    : 'text-[#9cf0ff]';

  const strokeColor = isCrit ? '#ffb4ab' : isHigh ? '#7bd0ff' : '#9cf0ff';

  const threatCategory = isCrit
    ? 'Category: Level-5 Severe Threat'
    : isHigh
    ? 'Category: Level-3 Elevated Threat'
    : 'Category: Level-1 Monitored';

  return (
    <div
      id="lake-live-inspector-card"
      className="bg-[#181b25] p-4 rounded-xl border border-[#262a34] shadow-lg space-y-4 flex flex-col justify-between"
    >
      {/* Lake Identification Header */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider">
            TARGET: {lake.code}
          </span>
          <span
            className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider ${
              isCrit
                ? 'bg-[#ffb4ab] text-[#690005] animate-pulse shadow-[0_0_12px_#ffb4ab]'
                : isHigh
                ? 'bg-[#00a6e0] text-[#00374d]'
                : 'bg-[#31353f] text-[#bac9cc]'
            }`}
          >
            {lake.riskLevel} Alert
          </span>
        </div>

        <h2 className="text-xl font-bold text-[#dfe2ef] tracking-tight" id="ins-name">
          {lake.name}
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-[#bac9cc] font-['JetBrains_Mono'] text-[10px]">
          <span>{lake.region}</span>
          <span>•</span>
          <span>{lake.coordinates}</span>
          <span>•</span>
          <span>Elev: {lake.elevation.toLocaleString()}m</span>
        </div>
      </div>

      {/* Overall GLOF Risk Gauge & Status Banner */}
      <div className="bg-[#1c1f29] p-4 rounded-xl border border-[#262a34] flex items-center justify-between shadow-inner">
        <div className="space-y-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase tracking-wide">
            Overall GLOF Risk Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className={`font-['JetBrains_Mono'] text-4xl font-extrabold ${scoreColor}`} id="ins-score">
              {lake.glofRiskScore}
            </span>
            <span className="text-[#849396] font-['JetBrains_Mono'] text-xs">/ 100</span>
          </div>
          <span className={`font-['JetBrains_Mono'] text-[10px] font-semibold uppercase tracking-wider ${scoreColor}`}>
            {threatCategory}
          </span>
        </div>

        {/* SVG Radial Gauge Visual */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-[#31353f]"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={strokeColor}
              strokeDasharray={`${lake.glofRiskScore}, 100`}
              strokeLinecap="round"
              strokeWidth="3.5"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <AlertCircle
            size={24}
            className={`absolute ${scoreColor}`}
          />
        </div>
      </div>

      {/* Key Lake Telemetry Stats Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#262a34]/60 border border-[#31353f]/40 p-2.5 rounded-lg space-y-0.5">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase">
            Surface Area
          </span>
          <div className="font-['JetBrains_Mono'] text-base font-bold text-[#dfe2ef]">
            {lake.surfaceAreaKm2} km²
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] font-semibold">
            +{lake.growthDeltaPercent}% vs 2023 Base
          </div>
        </div>

        <div className="bg-[#262a34]/60 border border-[#31353f]/40 p-2.5 rounded-lg space-y-0.5">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase">
            Est. Water Volume
          </span>
          <div className="font-['JetBrains_Mono'] text-base font-bold text-[#dfe2ef]">
            {lake.waterVolumeMCM}M m³
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#ffb4ab] font-semibold">
            +18% Seasonal surge
          </div>
        </div>

        <div className="bg-[#262a34]/60 border border-[#31353f]/40 p-2.5 rounded-lg space-y-0.5">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase">
            Moraine Dam Score
          </span>
          <div className="font-['JetBrains_Mono'] text-base font-bold text-[#ffb4ab]">
            {lake.moraineDamScore} / 100
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#ffdad6] font-semibold">
            Ice-cored piping
          </div>
        </div>

        <div className="bg-[#262a34]/60 border border-[#31353f]/40 p-2.5 rounded-lg space-y-0.5">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase">
            Settlement Dist.
          </span>
          <div className="font-['JetBrains_Mono'] text-base font-bold text-[#dfe2ef]">
            {lake.settlementDistanceKm} km
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] truncate">
            To {lake.nearestSettlement}
          </div>
        </div>

        {/* Population exposure full width bar */}
        <div className="bg-[#262a34]/60 border border-[#31353f]/40 p-2.5 rounded-lg col-span-2 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase">
              Pop. in direct 2h travel zone
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] font-bold">
              {lake.populationAtRisk.toLocaleString()} Souls
            </span>
          </div>
          <div className="w-full bg-[#0a0e17] h-2 rounded-full overflow-hidden">
            <div className="bg-[#ffb4ab] h-full w-[82%] shadow-[0_0_8px_#ffb4ab]"></div>
          </div>
          <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] flex justify-between pt-0.5">
            <span>Last Sync: {lake.lastObservation}</span>
            <span>Cloud cover: {lake.cloudCoverPercent}%</span>
          </div>
        </div>
      </div>

      {/* Inspector Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          id="btn-dispatch-early-warning"
          type="button"
          onClick={onDispatchAlert}
          className="w-full py-2.5 px-4 rounded-lg bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_16px_rgba(0,229,255,0.4)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Radio size={16} />
          <span>Dispatch Early Warning Advisory</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onRunSimulation}
            className="py-2 px-3 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] border border-[#3b494c]/50 font-['JetBrains_Mono'] text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Waves size={14} className="text-[#00e5ff]" />
            <span>Hydro Sim</span>
          </button>

          <button
            type="button"
            onClick={onOpenDossier}
            className="py-2 px-3 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#dfe2ef] border border-[#3b494c]/50 font-['JetBrains_Mono'] text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileDown size={14} className="text-[#7bd0ff]" />
            <span>PDF Dossier</span>
          </button>
        </div>
      </div>
    </div>
  );
};
