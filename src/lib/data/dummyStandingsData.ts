import { DriverStanding, ConstructorStanding } from '@/types/standings';

export const dummyDriverStandings: DriverStanding[] = [
  {
    position: 1,
    driver: {
      name: 'Max Verstappen',
      nationality: 'NED',
      team: 'Red Bull Racing',
    },
    points: 51,
    wins: 2,
  },
  {
    position: 2,
    driver: {
      name: 'Sergio Perez',
      nationality: 'MEX',
      team: 'Red Bull Racing',
    },
    points: 36,
    wins: 0,
  },
  {
    position: 3,
    driver: {
      name: 'Charles Leclerc',
      nationality: 'MON',
      team: 'Ferrari',
    },
    points: 28,
    wins: 0,
  },
  {
    position: 4,
    driver: {
      name: 'Carlos Sainz',
      nationality: 'ESP',
      team: 'Ferrari',
    },
    points: 24,
    wins: 0,
  },
  {
    position: 5,
    driver: {
      name: 'Lewis Hamilton',
      nationality: 'GBR',
      team: 'Mercedes',
    },
    points: 20,
    wins: 0,
  },
];

export const dummyConstructorStandings: ConstructorStanding[] = [
  {
    position: 1,
    constructor: {
      name: 'Red Bull Racing',
      nationality: 'AUT',
    },
    points: 87,
    wins: 2,
  },
  {
    position: 2,
    constructor: {
      name: 'Ferrari',
      nationality: 'ITA',
    },
    points: 52,
    wins: 0,
  },
  {
    position: 3,
    constructor: {
      name: 'Mercedes',
      nationality: 'GER',
    },
    points: 38,
    wins: 0,
  },
  {
    position: 4,
    constructor: {
      name: 'McLaren',
      nationality: 'GBR',
    },
    points: 20,
    wins: 0,
  },
  {
    position: 5,
    constructor: {
      name: 'Aston Martin',
      nationality: 'GBR',
    },
    points: 10,
    wins: 0,
  },
]; 