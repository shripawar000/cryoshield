import React, { useState } from 'react';
import { GlacialLake } from '../types';
import { Compass, Box, Satellite, Plus, Minus, Focus, Layers, AlertCircle, Home, Zap } from 'lucide-react';

interface TacticalMapProps {
  selectedLake: GlacialLake;
  onSelectLake: (lake: GlacialLake) => void;
  allLakes: GlacialLake[];
}

export const TacticalMap: React.FC<TacticalMapProps> = ({
  selectedLake,
  onSelectLake,
  allLakes,
}) => {
  const [mapMode, setMapMode] = useState<'sat' | '3d'>('sat');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [layers, setLayers] = useState({
    glacialLakes: true,
    teestaBasin: true,
    inundationZones: true,
    downstreamVillages: true,
    hydroDams: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.8, +(z + 0.2).toFixed(1)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.8, +(z - 0.2).toFixed(1)));
  const handleRecenter = () => setZoomLevel(1);

  return (
    <div
      id="tactical-gis-map-container"
      className="flex flex-col bg-[#181b25] rounded-xl border border-[#262a34] shadow-lg overflow-hidden"
    >
      {/* Top Map HUD Toolbar */}
      <div className="p-2.5 bg-[#262a34]/80 border-b border-[#31353f]/40 flex flex-wrap items-center justify-between gap-2 text-[#dfe2ef]">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-[#00e5ff]" />
          <span className="font-['JetBrains_Mono'] text-xs text-[#00e5ff] font-semibold uppercase tracking-wider">
            GIS Geo-Viewport: Himalayan Arc (Sikkim / Khumbu Sec-04)
          </span>
          <span className="px-2 py-0.5 rounded bg-[#0a0e17] text-[#bac9cc] font-['JetBrains_Mono'] text-[10px] border border-[#31353f]/50">
            GRID 27.9°N / 88.2°E
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* 3D Mode Toggle */}
          <button
            type="button"
            id="btn-3d"
            onClick={() => setMapMode('3d')}
            className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] transition-all flex items-center gap-1 border ${
              mapMode === '3d'
                ? 'bg-[#31353f] text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                : 'bg-[#1c1f29] hover:bg-[#353943] text-[#dfe2ef] border-[#31353f]'
            }`}
          >
            <Box size={13} />
            <span>3D Terrain</span>
          </button>

          {/* Satellite NIR Toggle */}
          <button
            type="button"
            id="btn-sat"
            onClick={() => setMapMode('sat')}
            className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] transition-all flex items-center gap-1 border ${
              mapMode === 'sat'
                ? 'bg-[#31353f] text-[#00e5ff] border-[#00e5ff]/50 shadow-[0_0_8px_rgba(0,229,255,0.2)]'
                : 'bg-[#1c1f29] hover:bg-[#353943] text-[#dfe2ef] border-[#31353f]'
            }`}
          >
            <Satellite size={13} />
            <span>Sentinel-2 NIR</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-[#1c1f29] border border-[#31353f] rounded px-1 ml-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
              title="Zoom In"
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
              title="Zoom Out"
            >
              <Minus size={14} />
            </button>
            <button
              type="button"
              onClick={handleRecenter}
              className="p-1 text-[#bac9cc] hover:text-[#00e5ff] transition-colors"
              title="Recenter Map"
            >
              <Focus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Tactical Map Viewport */}
      <div
        className={`relative w-full h-[520px] bg-[#0a0e17] overflow-hidden select-none transition-all duration-500 ${
          mapMode === '3d' ? 'perspective-[1000px]' : ''
        }`}
      >
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-300 origin-center"
          style={{
            transform: `scale(${zoomLevel}) ${mapMode === '3d' ? 'rotateX(20deg) scale(1.05)' : ''}`,
          }}
        >
          {/* Topographic Contour Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tactical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262a34" strokeWidth="0.75" strokeDasharray="2 3" />
              </pattern>
              <linearGradient id="surgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7bd0ff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Grid */}
            <rect width="100%" height="100%" fill="url(#tactical-grid)" opacity="0.6" />

            {/* Topographic Elevations */}
            <path d="M -10,120 Q 180,60 380,140 T 780,110 T 1100,160" fill="none" stroke="#353943" strokeWidth="1.2" strokeDasharray="5 3" opacity="0.5" />
            <path d="M -20,220 Q 220,180 440,260 T 820,200 T 1120,270" fill="none" stroke="#262a34" strokeWidth="1" opacity="0.6" />
            <path d="M -10,340 Q 240,290 520,390 T 900,320 T 1100,420" fill="none" stroke="#353943" strokeWidth="1.2" strokeDasharray="7 4" opacity="0.5" />
            <path d="M -20,440 Q 260,410 580,480 T 950,420 T 1140,510" fill="none" stroke="#262a34" strokeWidth="0.8" opacity="0.6" />

            {/* Teesta Hydro Drainage Basin Network */}
            {layers.teestaBasin && (
              <>
                <path
                  d="M 520,165 C 490,230 430,290 390,340 C 350,390 310,430 260,520"
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="2.5"
                  strokeOpacity="0.85"
                />
                <path
                  d="M 390,340 C 440,360 480,410 510,520"
                  fill="none"
                  stroke="#7bd0ff"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 680,120 C 640,200 580,260 520,330"
                  fill="none"
                  stroke="#7bd0ff"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                  strokeOpacity="0.5"
                />
              </>
            )}

            {/* Flood Inundation Zones */}
            {layers.inundationZones && (
              <polygon
                points="520,165 470,220 370,330 240,520 280,520 410,350 510,240 535,175"
                fill="url(#surgeGradient)"
                stroke="#ffb4ab"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />
            )}

            {/* Animated Outburst Surge Vector (Cyan dashed line moving downvalley) */}
            <path
              d="M 520,165 Q 460,260 390,340 T 260,520"
              fill="none"
              stroke="#00daf3"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            >
              <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3.5s" repeatCount="indefinite" />
            </path>
          </svg>

          {/* Regional Geography Anchor Labels */}
          <div className="absolute top-8 left-10 font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]/50 tracking-widest uppercase pointer-events-none">
            Himalayan Ridge Crest // Sector 04-North (Elev &gt; 5,800m)
          </div>
          <div className="absolute bottom-6 left-8 font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff]/60 pointer-events-none">
            Teesta River Upper Catchment Basin [Zone Alpha]
          </div>

          {/* GLACIAL LAKE NODES */}
          {layers.glacialLakes &&
            allLakes.map((lake) => {
              const isSelected = selectedLake.id === lake.id;
              const isCrit = lake.glofRiskScore >= 80;
              const isHigh = lake.glofRiskScore >= 60 && lake.glofRiskScore < 80;
              const isMod = lake.glofRiskScore >= 40 && lake.glofRiskScore < 60;

              let markerBg = 'bg-[#353943] text-[#dfe2ef]';
              let ringColor = 'border-[#353943]';
              if (isCrit) {
                markerBg = 'bg-[#ffb4ab] text-[#690005] shadow-[0_0_20px_#ffb4ab]';
                ringColor = 'border-[#ffb4ab]';
              } else if (isHigh) {
                markerBg = 'bg-[#00a6e0] text-[#00374d] shadow-[0_0_12px_#00a6e0]';
                ringColor = 'border-[#00a6e0]';
              } else if (isMod) {
                markerBg = 'bg-[#9cf0ff] text-[#00363d]';
                ringColor = 'border-[#9cf0ff]';
              }

              return (
                <div
                  key={lake.id}
                  id={`lake-marker-${lake.id}`}
                  className="absolute z-20 cursor-pointer group"
                  style={{
                    top: `${lake.mapY}%`,
                    left: `${lake.mapX}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => onSelectLake(lake)}
                >
                  {/* Outer Pulsing Effect */}
                  {isCrit && (
                    <>
                      <span className="absolute -inset-4 rounded-full bg-[#ffb4ab]/25 animate-ping pointer-events-none"></span>
                      <span className="absolute -inset-7 rounded-full bg-[#ffb4ab]/15 pointer-events-none"></span>
                    </>
                  )}

                  {/* Core Interactive Node Button */}
                  <button
                    type="button"
                    title={`${lake.name} (Risk: ${lake.glofRiskScore}/100)`}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center font-['JetBrains_Mono'] font-bold text-xs transition-transform duration-200 hover:scale-125 ${markerBg}`}
                  >
                    {isCrit ? <AlertCircle size={16} /> : <span>{lake.glofRiskScore}</span>}

                    {/* Active Target Reticle */}
                    {isSelected && (
                      <span
                        className={`absolute -inset-2 rounded-full border border-dashed ${ringColor} pointer-events-none animate-spin`}
                        style={{ animationDuration: '8s' }}
                      ></span>
                    )}
                  </button>

                  {/* Floating Tactical Hover/Active Card */}
                  {isSelected ? (
                    <div className="absolute left-10 -top-12 z-30 w-64 p-3 bg-[#31353f]/95 border border-[#00e5ff]/50 backdrop-blur-md rounded-lg shadow-2xl">
                      <div className="flex items-center justify-between gap-1">
                        <span className="px-1.5 py-0.5 rounded bg-[#93000a] text-[#ffdad6] font-['JetBrains_Mono'] text-[10px] font-bold uppercase tracking-wider">
                          {lake.riskLevel} {lake.glofRiskScore}/100
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] text-[#00e5ff]">
                          {lake.code}
                        </span>
                      </div>
                      <div className="font-semibold text-sm text-[#dfe2ef] mt-1.5">{lake.name}</div>
                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] flex justify-between mt-1">
                        <span>Area: {lake.surfaceAreaKm2} km² (+{lake.growthDeltaPercent}%)</span>
                        <span>Elev: {lake.elevation}m</span>
                      </div>
                      <div className="mt-2 pt-1.5 bg-[#181b25] px-2 py-1 rounded text-[10px] font-['JetBrains_Mono'] text-[#ffb4ab] flex items-center justify-between">
                        <span>Surge ETA: Chungthang</span>
                        <span className="font-bold">42 min</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute left-8 top-0 hidden group-hover:block whitespace-nowrap font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef] bg-[#262a34] px-2 py-1 rounded border border-[#3b494c] shadow-lg z-30">
                      {lake.name} ({lake.glofRiskScore}/100)
                    </div>
                  )}
                </div>
              );
            })}

          {/* DOWNSTREAM INFRASTRUCTURE PINS */}
          {layers.hydroDams && (
            <div
              className="absolute z-15 cursor-pointer hover:scale-110 transition-transform"
              style={{ top: '68%', left: '39%', transform: 'translate(-50%, -50%)' }}
              title="Chungthang III Hydro Station"
            >
              <div className="flex items-center gap-1.5 bg-[#262a34]/90 border border-[#ffb4ab]/40 px-2 py-1 rounded shadow-md">
                <Zap size={12} className="text-[#ffb4ab]" />
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef]">
                  Chungthang III Dam (14.2 km)
                </span>
              </div>
            </div>
          )}

          {layers.downstreamVillages && (
            <>
              <div
                className="absolute z-15 cursor-pointer hover:scale-110 transition-transform"
                style={{ top: '88%', left: '26%', transform: 'translate(-50%, -50%)' }}
                title="Dikchu Township"
              >
                <div className="flex items-center gap-1.5 bg-[#262a34]/90 border border-[#00e5ff]/40 px-2 py-1 rounded shadow-md">
                  <Home size={12} className="text-[#00e5ff]" />
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef]">
                    Dikchu Township (Pop 6,400)
                  </span>
                </div>
              </div>

              <div
                className="absolute z-15 cursor-pointer hover:scale-110 transition-transform"
                style={{ top: '78%', left: '46%', transform: 'translate(-50%, -50%)' }}
                title="Singtam Supply Corridor"
              >
                <div className="flex items-center gap-1.5 bg-[#262a34]/90 border border-[#7bd0ff]/40 px-2 py-1 rounded shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff]"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef]">
                    Singtam Bridge (68 km)
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Floating Vector Map Legend Box inside canvas */}
          <div className="absolute bottom-3 right-3 p-3 bg-[#0a0e17]/90 border border-[#262a34] backdrop-blur-md rounded-lg shadow-xl max-w-xs pointer-events-auto">
            <div className="font-['JetBrains_Mono'] text-[10px] text-[#dfe2ef] uppercase font-semibold mb-1.5 flex items-center gap-1.5">
              <Layers size={13} className="text-[#00e5ff]" />
              <span>Map Vector Legend</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-['JetBrains_Mono'] text-[10px] text-[#bac9cc]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></span>
                <span>Critical &gt;80</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a6e0]"></span>
                <span>High 60-79</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9cf0ff]"></span>
                <span>Moderate 40-59</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#353943]"></span>
                <span>Low &lt;40</span>
              </div>
              <div className="col-span-2 flex items-center gap-1.5 pt-1 text-[#00e5ff]">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-[#00e5ff]"></span>
                <span>Projected Outburst Surge Path</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Toggles Strip Under Map */}
      <div className="p-2.5 bg-[#262a34]/50 border-t border-[#31353f]/30 flex flex-wrap items-center gap-2 text-[#dfe2ef]">
        <span className="font-['JetBrains_Mono'] text-[10px] text-[#bac9cc] mr-1">
          ACTIVE LAYERS:
        </span>
        <button
          type="button"
          onClick={() => toggleLayer('glacialLakes')}
          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] flex items-center gap-1 transition-all ${
            layers.glacialLakes
              ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
              : 'bg-[#1c1f29] text-[#bac9cc] hover:text-[#dfe2ef]'
          }`}
        >
          <span>{layers.glacialLakes ? '✓' : '+'}</span>
          <span>Glacial Lakes</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('teestaBasin')}
          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] flex items-center gap-1 transition-all ${
            layers.teestaBasin
              ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
              : 'bg-[#1c1f29] text-[#bac9cc] hover:text-[#dfe2ef]'
          }`}
        >
          <span>{layers.teestaBasin ? '✓' : '+'}</span>
          <span>Teesta Basin Network</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('inundationZones')}
          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] flex items-center gap-1 transition-all ${
            layers.inundationZones
              ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
              : 'bg-[#1c1f29] text-[#bac9cc] hover:text-[#dfe2ef]'
          }`}
        >
          <span>{layers.inundationZones ? '✓' : '+'}</span>
          <span>Flood Inundation Zones</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('downstreamVillages')}
          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] flex items-center gap-1 transition-all ${
            layers.downstreamVillages
              ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
              : 'bg-[#1c1f29] text-[#bac9cc] hover:text-[#dfe2ef]'
          }`}
        >
          <span>{layers.downstreamVillages ? '✓' : '+'}</span>
          <span>Downstream Villages</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('hydroDams')}
          className={`px-2.5 py-1 rounded font-['JetBrains_Mono'] text-[10px] flex items-center gap-1 transition-all ${
            layers.hydroDams
              ? 'bg-[#00e5ff] text-[#00363d] font-semibold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
              : 'bg-[#1c1f29] text-[#bac9cc] hover:text-[#dfe2ef]'
          }`}
        >
          <span>{layers.hydroDams ? '✓' : '+'}</span>
          <span>Hydro Dams &amp; Bridges</span>
        </button>
      </div>
    </div>
  );
};
