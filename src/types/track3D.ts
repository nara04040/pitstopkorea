export interface Track3DPoint {
  x: number;
  y: number;
  z: number;
}

export interface Track3DCorner {
  number: number;
  name?: string;
  position: Track3DPoint;
  type: 'slow' | 'medium' | 'fast';
  angle: number;
}

export interface Track3DDRS {
  number: number;
  startPosition: Track3DPoint;
  endPosition: Track3DPoint;
}

export interface Track3DSector {
  number: number;
  startPosition: Track3DPoint;
  endPosition: Track3DPoint;
  color: string;
}

export interface Track3DData {
  trackPath: Track3DPoint[];
  corners: Track3DCorner[];
  drsZones: Track3DDRS[];
  sectors: Track3DSector[];
  elevation: Track3DPoint[];
  startLine: Track3DPoint;
  finishLine: Track3DPoint;
  trackWidth: number;
  trackLength: number;
} 