export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export interface GlacialLake {
  id: string;
  name: string;
  code: string;
  region: string;
  country: string;
  coordinates: string;
  lat: number;
  lng: number;
  elevation: number; // in meters
  surfaceAreaKm2: number;
  growthDeltaPercent: number;
  waterVolumeMCM: number; // Million cubic meters
  moraineDamScore: number; // 0 - 100 (lower = more degraded/unstable)
  glofRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  settlementDistanceKm: number;
  nearestSettlement: string;
  populationAtRisk: number;
  lastObservation: string;
  satelliteSource: string;
  cloudCoverPercent: number;
  freeboardMeters: number;
  iceCliffSlopeDeg: number;
  isothermAnomalyC: number;
  mapX: number; // SVG %
  mapY: number; // SVG %
}

export interface CascadeStage {
  step: string;
  title: string;
  description: string;
  probability: string;
  timeframe: string;
  status: 'critical' | 'high' | 'moderate' | 'nominal';
}

export interface DownstreamAsset {
  id: string;
  name: string;
  type: 'dam' | 'settlement' | 'bridge' | 'highway';
  distanceKm: number;
  distanceFromLakeKm?: number;
  etaMinutes: number;
  estimatedArrivalMin?: number;
  peakWaveMeters: number;
  population?: number;
  populationExposed?: number;
  capacity?: string;
  mitigationAction?: string;
  vulnerabilityScore?: number;
  status: 'critical' | 'alert' | 'standby';
}

export interface SimulationState {
  riskThreshold: number;
  outburstVolume: number;
  evacBufferRadius: number;
  isRunning: boolean;
  progress: number;
}

export type ActiveTab =
  | 'dashboard'
  | 'lake-monitoring'
  | 'risk-analysis'
  | 'exposure-map'
  | 'climate-trends'
  | 'cascade-model'
  | 'alert-center'
  | 'simulation'
  | 'reports'
  | 'tech-and-data';
