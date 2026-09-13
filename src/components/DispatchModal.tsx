import React, { useState } from 'react';
import { GlacialLake } from '../types';
import { AlertOctagon, X, Radio, CheckCircle2 } from 'lucide-react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLake: GlacialLake;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  selectedLake,
}) => {
  const [hasDispatched, setHasDispatched] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setHasDispatched(true);
    setTimeout(() => {
      setHasDispatched(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      id="early-warning-dispatch-modal"
      className="fixed inset-0 z-50 bg-[#0a0e17]/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-[#181b25] max-w-lg w-full rounded-2xl shadow-2xl p-6 space-y-4 border border-[#3b494c]/50 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#ffb4ab] font-bold text-lg">
            <AlertOctagon size={22} className="animate-pulse" />
            <span>Critical GLOF Advisory</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#1c1f29] border border-[#262a34] flex items-center justify-center text-[#bac9cc] hover:text-[#dfe2ef] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {hasDispatched ? (
          <div className="p-6 bg-[#00363d] text-[#c3f5ff] rounded-xl border border-[#00e5ff]/40 space-y-3 text-center">
            <CheckCircle2 size={40} className="text-[#00e5ff] mx-auto animate-bounce" />
            <div className="font-bold text-base">Transmission Broadcast Confirmed</div>
            <p className="text-xs text-[#9cf0ff] leading-relaxed">
              Cell broadcast sirens triggered across {selectedLake.region}. Emergency SMS successfully transmitted to {selectedLake.populationAtRisk.toLocaleString()} registered civilian devices. Downstream hydro plant floodgates alerted.
            </p>
          </div>
        ) : (
          <>
            {/* Warning Callout */}
            <div className="p-3 bg-[#93000a] text-[#ffdad6] rounded-lg text-xs space-y-1 border border-[#ffb4ab]/30 shadow-inner">
              <div className="font-bold uppercase tracking-wider">
                TARGET SECTOR: {selectedLake.region.toUpperCase()} — {selectedLake.name.toUpperCase()}
              </div>
              <div className="text-[11px] opacity-90">
                Estimated breach time under rapid melt scenario: &lt; 4 hours. Automated siren networks armed.
              </div>
            </div>

            {/* Explanatory details */}
            <div className="space-y-2 text-xs text-[#bac9cc] leading-relaxed">
              <p>
                You are about to transmit emergency cell broadcasts to{' '}
                <strong className="text-[#dfe2ef]">
                  {selectedLake.populationAtRisk.toLocaleString()} civilians
                </strong>{' '}
                and send urgent spillway mitigation signals to{' '}
                <strong className="text-[#dfe2ef]">4 hydroelectric facilities</strong> in the Upper Teesta Basin.
              </p>

              <div className="p-3 bg-[#1c1f29] rounded-lg border border-[#262a34] font-['JetBrains_Mono'] text-[11px] text-[#00e5ff] leading-relaxed">
                SMS Payload: "ALERT: Glacial flood alert {selectedLake.name}. Move immediately to ground &gt;50m above riverbed. Avoid river crossing bridges."
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262a34]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#1c1f29] hover:bg-[#262a34] text-[#dfe2ef] border border-[#3b494c]/40 font-['JetBrains_Mono'] text-xs transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 rounded-lg bg-[#ffb4ab] hover:bg-[#ffdad6] text-[#690005] font-['JetBrains_Mono'] text-xs font-bold uppercase transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/40 hover:scale-105 active:scale-95"
              >
                <Radio size={14} />
                <span>Confirm Transmission</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
