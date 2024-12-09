export interface Constructor {
  id: string;
  name: string;
  fullName: string;
  base: string;
  teamPrincipal: string;
  powerUnit: string;
  chassis: string;
  nationality: string;
  founded: number;
  worldChampionships: number;
  profileImage: string;
  teamColor: string;
  biography: string;
  careerHighlights: {
    year: number;
    achievement: string;
  }[];
  currentSeasonStats: {
    position: number;
    points: number;
    wins: number;
    podiums: number;
    fastestLaps: number;
  };
  currentDrivers: {
    name: string;
    number: number;
  }[];
} 