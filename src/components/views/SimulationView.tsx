import React from 'react';
import { SurgeSimulator } from '../SurgeSimulator';
import { Activity } from 'lucide-react';

export const SimulationView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md">
        <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
          <Activity size={16} /> 2D Hydrodynamic Laboratory
        </div>
        <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
          HEC-RAS 2D Glacial Breach Simulation Workbench
        </h1>
        <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
          Test customized dam failure parameters, debris concentration factors, and Manning's roughness coefficients.
        </p>
      </div>

      <SurgeSimulator />
    </div>
  );
};
