export interface TrackSector {
  number: number;
  length: number;
  characteristics: string;
  topSpeed: number;
}

export interface TrackDRSZone {
  number: number;
  length: number;
  detectionPoint: string;
  activationPoint: string;
}

export interface TrackCorner {
  number: number;
  name?: string;
  type: 'slow' | 'medium' | 'fast';
  angle: number;
  description: string;
}

export interface TrackRecord {
  type: 'race' | 'qualifying' | 'practice';
  time: string;
  driver: string;
  team: string;
  year: number;
  date: string;
}

export interface Track {
  id: string;
  name: string;
  location: string;
  length: number;
  turns: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  sectors: TrackSector[];
  drsZones: TrackDRSZone[];
  corners: TrackCorner[];
  mapImage: string;
  description: string;
  records: TrackRecord[];
} 