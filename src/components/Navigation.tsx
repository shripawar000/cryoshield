import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import {
  Shield,
  Radio,
  LayoutDashboard,
  Waves,
  LineChart,
  MapPin,
  CloudSun,
  GitFork,
  BellRing,
  Activity,
  FileText,
  Cpu,
  AlertTriangle,
  Volume2,
  VolumeX,
  Clock,
  User,
} from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab?: (tab: ActiveTab) => void;
  onTabChange?: (tab: ActiveTab) => void;
  onTriggerSimulation: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onDispatchAlert?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onTabChange,
  onTriggerSimulation,
  audioEnabled,
  onToggleAudio,
  onDispatchAlert,
}) => {
  const [utcTime, setUtcTime] = useState<string>('');

  const handleSelectTab = (tab: ActiveTab) => {
    if (onSelectTab) onSelectTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'lake-monitoring', label: 'Lake Monitoring', icon: <Waves size={18} /> },
    { id: 'risk-analysis', label: 'Risk Analysis', icon: <LineChart size={18} /> },
    { id: 'exposure-map', label: 'Exposure Map', icon: <MapPin size={18} /> },
    { id: 'climate-trends', label: 'Climate Trends', icon: <CloudSun size={18} /> },
    { id: 'cascade-model', label: 'Cascade Model', icon: <GitFork size={18} /> },
    { id: 'alert-center', label: 'Alert Center', icon: <BellRing size={18} />, badge: '3' },
    { id: 'simulation', label: 'Simulation', icon: <Activity size={18} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={18} /> },
    { id: 'tech-and-data', label: 'Tech & Data', icon: <Cpu size={18} /> },
  ];

  return (
    <>
      {/* LEFT TACTICAL SIDEBAR */}
      <aside
        id="cryoshield-sidebar"
        className="fixed left-0 top-0 h-full w-64 bg-[#0a0e17]/95 border-r border-[#1c1f29] backdrop-blur-xl z-50 flex flex-col pt-4 pb-6 select-none shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
      >
        {/* Brand Header */}
        <div className="px-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#262a34] flex items-center justify-center border border-[#3b494c]/40 text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.2)]">
              <Shield size={20} className="text-[#00e5ff]" />
            </div>
            <div>
              <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#00e5ff] tracking-wider uppercase">
                CryoShield
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] tracking-wider uppercase">
                GLOF Sector Command
              </div>
            </div>
          </div>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e5ff]"></span>
          </span>
        </div>

        {/* Telemetry Stream Status Pill */}
        <div className="px-4 mb-4">
          <div className="bg-[#181b25] border border-[#262a34] px-3 py-1.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Radio size={13} className="text-[#00e5ff] animate-pulse" />
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] font-semibold tracking-wider uppercase">
                Telemetry Stream
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] font-medium">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                type="button"
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left ${
                  isActive
                    ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_16px_rgba(0,229,255,0.3)]'
                    : 'text-[#bac9cc] hover:bg-[#262a34]/70 hover:text-[#dfe2ef]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#00363d]' : 'text-[#849396]'}>
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-bold ${
                      isActive
                        ? 'bg-[#00363d] text-[#c3f5ff]'
                        : 'bg-[#93000a] text-[#ffdad6]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Runtime Footer */}
        <div className="px-4 pt-3 mt-auto border-t border-[#1c1f29]">
          <div className="bg-[#181b25] p-2.5 rounded-lg border border-[#262a34]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
                SYS RUNTIME
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#00daf3]">
                99.98%
              </span>
            </div>
            <div className="w-full bg-[#31353f] h-1 rounded-full overflow-hidden">
              <div className="bg-[#00e5ff] h-full w-[99.98%] shadow-[0_0_6px_#00e5ff]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* TOP DUAL-TIER TACTICAL HEADER */}
      <header
        id="cryoshield-header"
        className="fixed top-0 left-64 right-0 h-20 bg-[#0a0e17]/85 backdrop-blur-xl z-40 border-b border-[#1c1f29]"
      >
        {/* Upper Micro-Telemetry Strip */}
        <div className="w-full h-7 bg-[#262a34]/60 px-4 flex items-center justify-between border-b border-[#31353f]/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse"></span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] font-semibold uppercase tracking-wide">
                System Operational
              </span>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#849396]">|</span>
            <div className="flex items-center gap-1.5 text-[#bac9cc]">
              <span className="font-['JetBrains_Mono'] text-[10px]">
                Sentinel-2 Update: 2h ago
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
              NODE: HIMALAYAN-SECTOR-4
            </span>
            <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] font-bold uppercase tracking-wider">
              DEFCON-4 NOMINAL
            </span>
          </div>
        </div>

        {/* Lower Main Navigation & Actions Bar */}
        <div className="h-13 px-4 flex items-center justify-between gap-4">
          {/* Quick horizontal category tabs (hidden on small viewports) */}
          <nav className="hidden xl:flex items-center gap-4 overflow-x-auto py-1">
            {navItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`text-xs whitespace-nowrap py-1 px-1 transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#00e5ff] border-[#00e5ff] font-semibold'
                      : 'text-[#bac9cc] border-transparent hover:text-[#dfe2ef]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Action cluster on the right */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Trigger Simulation Button */}
            <button
              id="header-trigger-simulation-btn"
              type="button"
              onClick={onTriggerSimulation}
              className="bg-[#93000a] hover:bg-[#93000a]/80 text-[#ffdad6] px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(244,63,94,0.3)] hover:scale-105 active:scale-95"
            >
              <AlertTriangle size={15} className="text-[#ffdad6]" />
              <span className="font-['JetBrains_Mono'] text-xs uppercase font-bold tracking-wider">
                Trigger Simulation
              </span>
            </button>

            {/* Audio Toggle Button */}
            <button
              id="header-audio-toggle-btn"
              type="button"
              onClick={onToggleAudio}
              title={audioEnabled ? 'Auditory telemetry alerts enabled' : 'Mute auditory telemetry'}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                audioEnabled
                  ? 'bg-[#262a34] text-[#00e5ff] border-[#00e5ff]/40 shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                  : 'bg-[#181b25] text-[#849396] border-[#31353f]'
              }`}
            >
              {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* UTC Clock Strip */}
            <div className="bg-[#262a34] border border-[#3b494c]/40 px-3 py-1 rounded-lg flex items-center gap-2">
              <Clock size={13} className="text-[#00e5ff]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#dfe2ef] font-semibold tracking-wider">
                {utcTime || '14:28:09 UTC'}
              </span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#849396]">|</span>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] font-medium tracking-wide">
                HIMALAYAN SECTOR 04
              </span>
            </div>

            {/* User Profile avatar */}
            <div className="flex items-center gap-2 pl-1 border-l border-[#31353f]/60">
              <div className="text-right hidden 2xl:block">
                <div className="font-['JetBrains_Mono'] text-xs font-semibold text-[#dfe2ef]">
                  Dr. A. Sharma
                </div>
                <div className="font-['JetBrains_Mono'] text-[10px] text-[#00daf3] uppercase">
                  Lead Glaciologist
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#00e5ff] flex items-center justify-center text-[#00363d] font-bold shadow-[0_0_8px_#00e5ff]">
                <User size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
