export interface Driver {
  id: string;
  name: string;
  number: number;
  team: string;
  nationality: string;
  birthYear: number;
  podiums: number;
  points: number;
  worldChampionships: number;
  profileImage: string;
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
} 