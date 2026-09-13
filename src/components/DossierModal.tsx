import React from 'react';
import { GlacialLake } from '../types';
import { FileText, X, Download, Printer, ShieldAlert } from 'lucide-react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  lake: GlacialLake;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  lake,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="intelligence-dossier-modal"
      className="fixed inset-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="bg-[#181b25] max-w-2xl w-full rounded-2xl shadow-2xl border border-[#3b494c]/50 p-6 space-y-4 my-8 relative text-[#dfe2ef]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#262a34] pb-3">
          <div className="flex items-center gap-2 text-[#00e5ff]">
            <FileText size={20} />
            <div>
              <div className="font-['JetBrains_Mono'] text-xs uppercase font-bold tracking-wider">
                Tactical Cryosphere Hazard Dossier // ICIMOD-GLOF-SEC
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
                CLASSIFICATION: RESTRICTED // NATIONAL DISASTER MITIGATION
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#1c1f29] border border-[#262a34] flex items-center justify-center text-[#bac9cc] hover:text-[#dfe2ef]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dossier Body */}
        <div className="space-y-4 text-xs">
          <div className="bg-[#1c1f29] p-3.5 rounded-lg border border-[#262a34] flex flex-wrap justify-between items-center gap-2">
            <div>
              <div className="text-sm font-bold text-[#dfe2ef]">{lake.name} ({lake.code})</div>
              <div className="text-[#bac9cc] font-['JetBrains_Mono'] text-[11px]">
                {lake.region} | Coordinates: {lake.coordinates} | Elevation: {lake.elevation}m
              </div>
            </div>
            <div className="text-right">
              <span className="px-2 py-1 rounded bg-[#93000a] text-[#ffdad6] font-['JetBrains_Mono'] text-[10px] font-bold uppercase">
                Risk Score: {lake.glofRiskScore} / 100 ({lake.riskLevel})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#262a34]/60 p-2.5 rounded border border-[#31353f]/30">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">SURFACE AREA</div>
              <div className="font-bold text-sm text-[#00e5ff]">{lake.surfaceAreaKm2} km²</div>
              <div className="text-[10px] text-[#ffb4ab]">+{lake.growthDeltaPercent}% growth</div>
            </div>
            <div className="bg-[#262a34]/60 p-2.5 rounded border border-[#31353f]/30">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">STORED WATER</div>
              <div className="font-bold text-sm text-[#00e5ff]">{lake.waterVolumeMCM}M m³</div>
              <div className="text-[10px] text-[#ffb4ab]">Peak Surge Hydro</div>
            </div>
            <div className="bg-[#262a34]/60 p-2.5 rounded border border-[#31353f]/30">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">MORAINE FREEBOARD</div>
              <div className="font-bold text-sm text-[#ffb4ab]">{lake.freeboardMeters} meters</div>
              <div className="text-[10px] text-[#ffdad6]">Critical breach limit</div>
            </div>
            <div className="bg-[#262a34]/60 p-2.5 rounded border border-[#31353f]/30">
              <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">AVALANCHE SLOPE</div>
              <div className="font-bold text-sm text-[#7bd0ff]">{lake.iceCliffSlopeDeg}° gradient</div>
              <div className="text-[10px] text-[#bac9cc]">Overhanging cliff</div>
            </div>
          </div>

          <div className="space-y-2 leading-relaxed">
            <h4 className="font-bold text-xs uppercase font-['JetBrains_Mono'] text-[#00e5ff] flex items-center gap-1.5">
              <ShieldAlert size={14} /> Geomechanical &amp; Cryospheric Findings
            </h4>
            <p className="text-[#bac9cc]">
              Sentinel-1 Synthetic Aperture Radar (SAR) interferometry confirms steady surface deformation and moraine piping along the eastern drainage lip. The sub-surface permafrost ice-core has thawed by an estimated 1.4m over the recent summer melt cycle. If triggered by an upstream hanging glacier collapse, peak discharge wave heights are modeled to exceed 18 meters at the Chungthang valley constriction.
            </p>
          </div>

          <div className="bg-[#1c1f29] p-3 rounded-lg border border-[#262a34] space-y-1">
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff] uppercase font-bold">
              Mandated Civil Defence Actions
            </div>
            <ul className="list-disc list-inside text-[11px] text-[#bac9cc] space-y-0.5">
              <li>Immediate spillway gate drawdown at Teesta Stage III &amp; Stage V impoundments.</li>
              <li>Autonomous radio-telemetry acoustic sirens placed on 15-minute ping intervals.</li>
              <li>Evacuation staging ready for 14,850 civilians across Dikchu, Chungthang, and Singtam.</li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-[#262a34] pt-3">
          <span className="font-['JetBrains_Mono'] text-[10px] text-[#849396]">
            Document ID: GLOF-DOSSIER-{lake.id}-2026
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded bg-[#1c1f29] hover:bg-[#262a34] text-[#dfe2ef] border border-[#3b494c]/50 font-['JetBrains_Mono'] text-xs flex items-center gap-1.5"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={() => {
                alert(`Exporting official PDF dossier for ${lake.name}...`);
                onClose();
              }}
              className="px-3 py-1.5 rounded bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-['JetBrains_Mono'] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
