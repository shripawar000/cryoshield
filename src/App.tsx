/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, GlacialLake } from './types';
import { HIMALAYAN_LAKES } from './data/lakeData';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/views/DashboardView';
import { LakeMonitoringView } from './components/views/LakeMonitoringView';
import { RiskAnalysisView } from './components/views/RiskAnalysisView';
import { ExposureMapView } from './components/views/ExposureMapView';
import { ClimateTrendsView } from './components/views/ClimateTrendsView';
import { CascadeModelView } from './components/views/CascadeModelView';
import { AlertCenterView } from './components/views/AlertCenterView';
import { SimulationView } from './components/views/SimulationView';
import { ReportsView } from './components/views/ReportsView';
import { TechDataView } from './components/views/TechDataView';
import { DispatchModal } from './components/DispatchModal';
import { DossierModal } from './components/DossierModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedLake, setSelectedLake] = useState<GlacialLake>(HIMALAYAN_LAKES[0]);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isSimulationActive, setIsSimulationActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle tactical audio feedback using Web Audio API
  const playTacticalSound = (freq = 880, type: OscillatorType = 'sine', duration = 0.08) => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handleTabChange = (tab: ActiveTab) => {
    playTacticalSound(660, 'triangle', 0.06);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLake = (lake: GlacialLake) => {
    playTacticalSound(880, 'sine', 0.07);
    setSelectedLake(lake);
  };

  const handleTriggerSimulation = () => {
    playTacticalSound(440, 'sawtooth', 0.2);
    setIsSimulationActive(true);
    setActiveTab('simulation');
  };

  const handleOpenDispatch = () => {
    playTacticalSound(980, 'square', 0.15);
    setIsAlertModalOpen(true);
  };

  const handleOpenDossier = () => {
    playTacticalSound(520, 'sine', 0.09);
    setIsDossierModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#dfe2ef] flex">
      {/* Tactical Shell: Fixed Sidebar & Dual-Tier Top Header */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onTriggerSimulation={handleTriggerSimulation}
        onDispatchAlert={handleOpenDispatch}
      />

      {/* Main Content Area (Offset by fixed w-64 sidebar and pt-24 top header) */}
      <main className="flex-1 pl-64 pt-24 min-h-screen pb-16 overflow-x-hidden">
        <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <DashboardView
              lakes={HIMALAYAN_LAKES}
              selectedLake={selectedLake}
              onSelectLake={handleSelectLake}
              onDispatchAlert={handleOpenDispatch}
              onRunSimulation={handleTriggerSimulation}
              onOpenDossier={handleOpenDossier}
            />
          )}

          {activeTab === 'lake-monitoring' && (
            <LakeMonitoringView
              lakes={HIMALAYAN_LAKES}
              selectedLake={selectedLake}
              onSelectLake={handleSelectLake}
            />
          )}

          {activeTab === 'risk-analysis' && (
            <RiskAnalysisView selectedLake={selectedLake} />
          )}

          {activeTab === 'exposure-map' && <ExposureMapView />}

          {activeTab === 'climate-trends' && <ClimateTrendsView />}

          {activeTab === 'cascade-model' && <CascadeModelView />}

          {activeTab === 'alert-center' && (
            <AlertCenterView onDispatchAlert={handleOpenDispatch} />
          )}

          {activeTab === 'simulation' && <SimulationView />}

          {activeTab === 'reports' && (
            <ReportsView onOpenDossier={handleOpenDossier} />
          )}

          {activeTab === 'tech-and-data' && <TechDataView />}
        </div>
      </main>

      {/* Floating Tactical Modals */}
      <DispatchModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        selectedLake={selectedLake}
      />

      <DossierModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        lake={selectedLake}
      />
    </div>
  );
}
