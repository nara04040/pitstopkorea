export interface Driver {
  position: number;
  code: string;
  number: string;
  firstName: string;
  lastName: string;
  team: string;
  lastLapTime: string;
  gapToLeader: string;
  status: 'running' | 'out' | 'pit';
  sector1Time?: string;
  sector2Time?: string;
  sector3Time?: string;
  bestLapTime?: string;
  tyreCompound?: 'soft' | 'medium' | 'hard' | 'intermediate' | 'wet';
  tyreAge?: number;
}

export interface RaceSession {
  type: 'practice' | 'qualifying' | 'sprint' | 'race';
  name: string;
  circuit: {
    name: string;
    country: string;
    length: number;
    totalLaps: number;
  };
  currentLap: number;
  totalLaps: number;
  weather: {
    temperature: number;
    trackTemperature: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    precipitation: number;
  };
  drivers: Driver[];
}

export interface NextRace {
  name: string;
  circuit: {
    name: string;
    country: string;
  };
  date: string;
  startTime: string;
  round: number;
  totalLaps: number;
} 