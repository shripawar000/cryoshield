import React, { useState } from 'react';
import { Activity, Play, RotateCcw, AlertTriangle } from 'lucide-react';

export const SurgeSimulator: React.FC = () => {
  const [riskThreshold, setRiskThreshold] = useState(85);
  const [outburstVolume, setOutburstVolume] = useState(50);
  const [evacRadius, setEvacRadius] = useState(18);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  // Dynamically compute wave travel times and heights based on volume and risk
  const factor = (outburstVolume / 50) * (riskThreshold / 85);
  const min1 = Math.max(15, Math.round(42 / factor));
  const min2 = Math.max(45, Math.round(78 / factor));
  const min3 = Math.max(80, Math.round(125 / factor));

  const waveHeight1 = +(18.4 * (outburstVolume / 50)).toFixed(1);
  const waveHeight2 = +(9.2 * (outburstVolume / 50)).toFixed(1);
  const waveHeight3 = +(6.8 * (outburstVolume / 50)).toFixed(1);

  const startSurgeSimulation = () => {
    setIsSimulating(true);
    setSimStep(0);
    const interval = setInterval(() => {
      setSimStep((s) => {
        if (s >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return s + 5;
      });
    }, 150);
  };

  const resetSurge = () => {
    setIsSimulating(false);
    setSimStep(0);
    setRiskThreshold(85);
    setOutburstVolume(50);
    setEvacRadius(18);
  };

  return (
    <div
      id="surge-simulator-section"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity size={20} className="text-[#00e5ff]" />
            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              GLOF Hydrodynamic Surge Simulator
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#bac9cc]">
            Simulate custom moraine breach scenarios to assess wave front velocity and downstream arrival times.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-[#262a34] border border-[#3b494c]/40 text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase font-semibold">
            HEC-RAS 2D Integration
          </span>
          <button
            type="button"
            onClick={resetSurge}
            className="p-1.5 rounded-lg bg-[#262a34] hover:bg-[#353943] text-[#bac9cc] hover:text-[#dfe2ef] transition-colors border border-[#31353f]"
            title="Reset Simulation Parameters"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Simulation Interactive Parameters Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#1c1f29] p-4 rounded-xl border border-[#262a34]">
        {/* Slider 1: Risk Threshold */}
        <div className="space-y-2">
          <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
            <span className="text-[#bac9cc] uppercase">Risk Threshold</span>
            <span className="text-[#00e5ff] font-bold" id="val-risk">
              {riskThreshold} / 100
            </span>
          </div>
          <input
            id="slider-risk"
            type="range"
            min="40"
            max="100"
            value={riskThreshold}
            onChange={(e) => setRiskThreshold(Number(e.target.value))}
            className="w-full accent-[#00e5ff] cursor-pointer"
          />
          <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#849396]">
            <span>40 (Mod)</span>
            <span>100 (Crit)</span>
          </div>
        </div>

        {/* Slider 2: Outburst Volume */}
        <div className="space-y-2">
          <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
            <span className="text-[#bac9cc] uppercase">Outburst Volume</span>
            <span className="text-[#00e5ff] font-bold" id="val-vol">
              {outburstVolume}.0M m³
            </span>
          </div>
          <input
            id="slider-vol"
            type="range"
            min="10"
            max="80"
            value={outburstVolume}
            onChange={(e) => setOutburstVolume(Number(e.target.value))}
            className="w-full accent-[#00e5ff] cursor-pointer"
          />
          <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#849396]">
            <span>10M m³</span>
            <span>80M m³</span>
          </div>
        </div>

        {/* Slider 3: Evac Buffer Radius */}
        <div className="space-y-2">
          <div className="flex justify-between font-['JetBrains_Mono'] text-xs">
            <span className="text-[#bac9cc] uppercase">Evac Buffer Radius</span>
            <span className="text-[#00e5ff] font-bold" id="val-rad">
              {evacRadius} km
            </span>
          </div>
          <input
            id="slider-rad"
            type="range"
            min="5"
            max="40"
            value={evacRadius}
            onChange={(e) => setEvacRadius(Number(e.target.value))}
            className="w-full accent-[#00e5ff] cursor-pointer"
          />
          <div className="flex justify-between font-['JetBrains_Mono'] text-[10px] text-[#849396]">
            <span>5 km</span>
            <span>40 km</span>
          </div>
        </div>
      </div>

      {/* Dynamic Output Timings based on Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase block">
            ETA: Chungthang Village (14km)
          </span>
          <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#ffb4ab]" id="sim-time-1">
            T + {min1} min
          </div>
          <span className="text-xs text-[#bac9cc]">Wave height: {waveHeight1} meters</span>
        </div>

        <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase block">
            ETA: Mangan District (38km)
          </span>
          <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#7bd0ff]" id="sim-time-2">
            T + {Math.floor(min2 / 60)}h {min2 % 60}m
          </div>
          <span className="text-xs text-[#bac9cc]">Wave height: {waveHeight2} meters</span>
        </div>

        <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] space-y-1">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] uppercase block">
            ETA: Dikchu Hydro Dam (52km)
          </span>
          <div className="font-['JetBrains_Mono'] text-lg font-bold text-[#00e5ff]" id="sim-time-3">
            T + {Math.floor(min3 / 60)}h {min3 % 60}m
          </div>
          <span className="text-xs text-[#bac9cc]">Wave height: {waveHeight3} meters</span>
        </div>
      </div>

      {/* Live Surge Simulation Controller */}
      <div className="bg-[#1c1f29] p-3 rounded-lg border border-[#262a34] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={startSurgeSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-lg bg-[#00e5ff] text-[#00363d] font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Play size={14} className={isSimulating ? 'animate-pulse' : ''} />
            <span>{isSimulating ? 'Simulating Propagation...' : 'Animate Wave Surge'}</span>
          </button>

          {simStep > 0 && (
            <span className="font-['JetBrains_Mono'] text-xs text-[#00e5ff]">
              Progress: {simStep}% ({Math.round((simStep / 100) * 75)} km downvalley)
            </span>
          )}
        </div>

        <div className="w-full sm:flex-1 max-w-md bg-[#0a0e17] h-2.5 rounded-full overflow-hidden border border-[#262a34]">
          <div
            className="bg-gradient-to-r from-[#ffb4ab] via-[#00e5ff] to-[#7bd0ff] h-full transition-all duration-150"
            style={{ width: `${simStep}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
