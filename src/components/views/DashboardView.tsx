import React from 'react';
import { GlacialLake } from '../../types';
import { TacticalMap } from '../TacticalMap';
import { LakeInspector } from '../LakeInspector';
import { ExplainabilityEngine } from '../ExplainabilityEngine';
import { SatelliteComparison } from '../SatelliteComparison';
import { LakeInventoryTable } from '../LakeInventoryTable';
import { CascadeDisasterModel } from '../CascadeDisasterModel';
import { DownstreamExposure } from '../DownstreamExposure';
import { SurgeSimulator } from '../SurgeSimulator';
import { DataProvenance } from '../DataProvenance';

interface DashboardViewProps {
  lakes: GlacialLake[];
  selectedLake: GlacialLake;
  onSelectLake: (lake: GlacialLake) => void;
  onDispatchAlert: () => void;
  onRunSimulation: () => void;
  onOpenDossier: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lakes,
  selectedLake,
  onSelectLake,
  onDispatchAlert,
  onRunSimulation,
  onOpenDossier,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Tactical Map + Selected Lake Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <TacticalMap
            selectedLake={selectedLake}
            onSelectLake={onSelectLake}
            allLakes={lakes}
          />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <LakeInspector
            lake={selectedLake}
            onDispatchAlert={onDispatchAlert}
            onRunSimulation={onRunSimulation}
            onOpenDossier={onOpenDossier}
          />
        </div>
      </div>

      {/* AI Risk Assessment & Explainability Engine */}
      <ExplainabilityEngine selectedLake={selectedLake} />

      {/* Satellite Multi-Temporal Change Detection */}
      <SatelliteComparison />

      {/* Regional Glacial Lake Inventory Table */}
      <LakeInventoryTable
        lakes={lakes}
        selectedLake={selectedLake}
        onSelectLake={onSelectLake}
      />

      {/* Cascade Disaster Multi-Stage Analysis & Downstream Exposure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 flex flex-col">
          <CascadeDisasterModel />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <DownstreamExposure
            onRunSimulation={onRunSimulation}
            onDispatchAlert={onDispatchAlert}
          />
        </div>
      </div>

      {/* GLOF Hydrodynamic Surge Simulator & Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <SurgeSimulator />
        </div>

        <div className="lg:col-span-4 flex flex-col">
          <DataProvenance />
        </div>
      </div>
    </div>
  );
};
