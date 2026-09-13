import React from 'react';
import { FileText, Download, ShieldCheck, Printer } from 'lucide-react';

interface ReportsViewProps {
  onOpenDossier: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ onOpenDossier }) => {
  const reports = [
    {
      title: 'South Lhonak Post-Expansion Threat Assessment (ICIMOD-2026-Q1)',
      date: 'Generated 2026-03-12',
      classification: 'RESTRICTED',
      pages: '28 Pages',
      summary: 'Bathymetric volume, moraine piping velocity, and Teesta Stage III drawdown advisories.',
    },
    {
      title: 'Eastern Himalayas Critical GLOF Inventory (Sikkim & Bhutan)',
      date: 'Generated 2026-02-28',
      classification: 'OFFICIAL USE',
      pages: '54 Pages',
      summary: 'Comprehensive census of 24 high-risk glacial lakes exceeding 1.0 km² surface area.',
    },
    {
      title: 'Civil Evacuation Route Feasibility & Road Network Survivability',
      date: 'Generated 2026-01-15',
      classification: 'INTERNAL',
      pages: '19 Pages',
      summary: 'NH-10 cut-off vulnerability analysis and alternate military helicopter staging zones.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#00e5ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-1">
            <FileText size={16} /> National Disaster Intelligence
          </div>
          <h1 className="text-2xl font-bold text-[#dfe2ef] tracking-tight">
            Compliance Briefings &amp; GLOF Intelligence Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#bac9cc] mt-1">
            Automated civil defence compliance documents formatted to NDMA and ICIMOD specifications.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenDossier}
          className="px-4 py-2.5 rounded-lg bg-[#00e5ff] hover:bg-[#00daf3] text-[#00363d] font-bold text-xs font-['JetBrains_Mono'] uppercase flex items-center gap-2 transition-all shadow-[0_0_12px_rgba(0,229,255,0.3)]"
        >
          <FileText size={16} />
          <span>Open Full Intelligence Dossier</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="space-y-4">
        {reports.map((rep, idx) => (
          <div
            key={idx}
            className="bg-[#181b25] p-5 rounded-xl border border-[#262a34] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md hover:border-[#3b494c] transition-colors"
          >
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#262a34] text-[#00e5ff] font-['JetBrains_Mono'] text-[10px] uppercase font-semibold">
                  {rep.classification}
                </span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#bac9cc]">
                  {rep.date} • {rep.pages}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#dfe2ef]">{rep.title}</h3>
              <p className="text-xs text-[#bac9cc]">{rep.summary}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onOpenDossier}
                className="px-3 py-1.5 rounded bg-[#1c1f29] hover:bg-[#262a34] text-[#dfe2ef] border border-[#31353f] text-xs font-['JetBrains_Mono'] flex items-center gap-1.5"
              >
                <Download size={14} className="text-[#00e5ff]" />
                <span>PDF Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
