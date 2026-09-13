import React, { useState, useMemo } from 'react';
import { GlacialLake, RiskLevel } from '../types';
import { Table, Search } from 'lucide-react';

interface LakeInventoryTableProps {
  lakes: GlacialLake[];
  selectedLake: GlacialLake;
  onSelectLake: (lake: GlacialLake) => void;
}

export const LakeInventoryTable: React.FC<LakeInventoryTableProps> = ({
  lakes,
  selectedLake,
  onSelectLake,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'ALL' | RiskLevel>('ALL');

  const filteredLakes = useMemo(() => {
    return lakes.filter((lake) => {
      const matchesSearch =
        lake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lake.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lake.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lake.code.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (riskFilter === 'ALL') return true;
      if (riskFilter === 'CRITICAL') return lake.glofRiskScore >= 80;
      if (riskFilter === 'HIGH') return lake.glofRiskScore >= 60 && lake.glofRiskScore < 80;
      if (riskFilter === 'MODERATE') return lake.glofRiskScore < 60;

      return true;
    });
  }, [lakes, searchTerm, riskFilter]);

  return (
    <div
      id="glacial-lakes-inventory-table-section"
      className="bg-[#181b25] p-6 rounded-xl border border-[#262a34] shadow-md space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Table size={20} className="text-[#00e5ff]" />
            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              Regional Glacial Lake Inventory &amp; Real-Time Telemetry
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#bac9cc]">
            Live telemetry from autonomous satellite edge detection across the Greater Himalayan Range.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-2.5 top-2.5 text-[#849396] pointer-events-none"
            />
            <input
              id="lake-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search lake or sector..."
              className="pl-8 pr-3 py-1.5 bg-[#1c1f29] border border-[#262a34] rounded-lg text-xs text-[#dfe2ef] placeholder:text-[#849396] focus:outline-none focus:ring-1 focus:ring-[#00e5ff] w-48 sm:w-60"
            />
          </div>

          <select
            id="lake-risk-filter"
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value as any)}
            className="bg-[#1c1f29] border border-[#262a34] text-[#dfe2ef] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#00e5ff] cursor-pointer"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical Risk (&gt;80)</option>
            <option value="HIGH">High Risk (60-79)</option>
            <option value="MODERATE">Moderate / Low (&lt;60)</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-[#262a34]">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#262a34]/80 text-[#bac9cc] font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider border-b border-[#31353f]/40">
            <tr>
              <th className="p-3">Glacial Lake Identifier</th>
              <th className="p-3">Sector / Region</th>
              <th className="p-3">Surface Area</th>
              <th className="p-3">Growth Delta</th>
              <th className="p-3">Water Volume</th>
              <th className="p-3">Moraine Dam Score</th>
              <th className="p-3">GLOF Risk</th>
              <th className="p-3">Alert State</th>
              <th className="p-3">Last Observation</th>
            </tr>
          </thead>
          <tbody className="bg-[#1c1f29]/60 divide-y divide-[#262a34] text-[#dfe2ef]">
            {filteredLakes.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-6 text-center text-[#849396] font-['JetBrains_Mono']">
                  No glacial lakes match the specified search or filter criteria.
                </td>
              </tr>
            ) : (
              filteredLakes.map((lake) => {
                const isSelected = selectedLake.id === lake.id;
                const isCrit = lake.glofRiskScore >= 80;
                const isHigh = lake.glofRiskScore >= 60 && lake.glofRiskScore < 80;

                return (
                  <tr
                    key={lake.id}
                    onClick={() => onSelectLake(lake)}
                    className={`hover:bg-[#262a34]/60 cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#262a34] ring-1 ring-inset ring-[#00e5ff]/50' : ''
                    }`}
                  >
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCrit
                            ? 'bg-[#ffb4ab] animate-ping'
                            : isHigh
                            ? 'bg-[#00a6e0]'
                            : 'bg-[#9cf0ff]'
                        }`}
                      ></span>
                      <span className={isSelected ? 'text-[#00e5ff] font-bold' : ''}>
                        {lake.name}
                      </span>
                    </td>

                    <td className="p-3 text-[#bac9cc] font-['JetBrains_Mono'] text-[11px]">
                      {lake.region}
                    </td>

                    <td className="p-3 font-['JetBrains_Mono']">{lake.surfaceAreaKm2} km²</td>

                    <td
                      className={`p-3 font-['JetBrains_Mono'] font-bold ${
                        isCrit ? 'text-[#ffb4ab]' : 'text-[#7bd0ff]'
                      }`}
                    >
                      +{lake.growthDeltaPercent}%
                    </td>

                    <td className="p-3 font-['JetBrains_Mono']">{lake.waterVolumeMCM}M m³</td>

                    <td
                      className={`p-3 font-['JetBrains_Mono'] font-semibold ${
                        lake.moraineDamScore < 40
                          ? 'text-[#ffb4ab]'
                          : lake.moraineDamScore < 65
                          ? 'text-[#7bd0ff]'
                          : 'text-[#9cf0ff]'
                      }`}
                    >
                      {lake.moraineDamScore} / 100
                    </td>

                    <td
                      className={`p-3 font-['JetBrains_Mono'] font-bold ${
                        isCrit
                          ? 'text-[#ffb4ab]'
                          : isHigh
                          ? 'text-[#7bd0ff]'
                          : 'text-[#9cf0ff]'
                      }`}
                    >
                      {lake.glofRiskScore} / 100
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wide ${
                          isCrit
                            ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40'
                            : isHigh
                            ? 'bg-[#00374d] text-[#7bd0ff] border border-[#7bd0ff]/40'
                            : 'bg-[#262a34] text-[#9cf0ff]'
                        }`}
                      >
                        {lake.riskLevel}
                      </span>
                    </td>

                    <td className="p-3 text-[#bac9cc] font-['JetBrains_Mono'] text-[10px]">
                      {lake.lastObservation}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
