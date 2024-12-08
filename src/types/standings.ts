export interface DriverStanding {
  position: number;
  driver: {
    name: string;
    nationality: string;
    team: string;
  };
  points: number;
  wins: number;
}

export interface ConstructorStanding {
  position: number;
  constructor: {
    name: string;
    nationality: string;
  };
  points: number;
  wins: number;
} 