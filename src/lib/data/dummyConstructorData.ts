import { Constructor } from '@/types/constructor';

export const dummyConstructors: { [key: string]: Constructor } = {
  'red-bull-racing': {
    id: 'red-bull-racing',
    name: 'Red Bull Racing',
    fullName: 'Oracle Red Bull Racing',
    base: 'Milton Keynes, United Kingdom',
    teamPrincipal: 'Christian Horner',
    powerUnit: 'Honda RBPT',
    chassis: 'RB20',
    nationality: 'AUT',
    founded: 2005,
    worldChampionships: 6,
    profileImage: '/images/constructors/red-bull.jpg',
    teamColor: '#0600EF',
    biography: '레드불 레이싱은 2005년 재규어 레이싱을 인수하며 F1에 참가했습니다. 세바스찬 베텔과 함께 2010년부터 2013년까지 4연속 더블 챔피언십을 달성했으며, 2021년부터 막스 베르스타펜과 함께 새로운 황금기를 맞이하고 있습니다.',
    careerHighlights: [
      { year: 2005, achievement: 'F1 참가 (재규어 레이싱 인수)' },
      { year: 2009, achievement: '첫 F1 우승 (중국 GP)' },
      { year: 2010, achievement: '첫 더블 챔피언십 달성' },
      { year: 2021, achievement: '드라이버 챔피언십 우승' },
      { year: 2022, achievement: '더블 챔피언십 달성' },
      { year: 2023, achievement: '21승 기록으로 더블 챔피언십' }
    ],
    currentSeasonStats: {
      position: 1,
      points: 87,
      wins: 2,
      podiums: 4,
      fastestLaps: 1
    },
    currentDrivers: [
      { name: 'Max Verstappen', number: 1 },
      { name: 'Sergio Perez', number: 11 }
    ]
  },
  'ferrari': {
    id: 'ferrari',
    name: 'Ferrari',
    fullName: 'Scuderia Ferrari',
    base: 'Maranello, Italy',
    teamPrincipal: 'Frédéric Vasseur',
    powerUnit: 'Ferrari',
    chassis: 'SF-24',
    nationality: 'ITA',
    founded: 1950,
    worldChampionships: 16,
    profileImage: '/images/constructors/ferrari.jpg',
    teamColor: '#DC0000',
    biography: '스쿠데리아 페라리는 F1의 가장 오래되고 성공적인 팀입니다. 1950년 F1 창립 멤버로 참가하여 16회의 컨스트럭터 챔피언십과 15회의 드라이버 챔피언십을 획득했습니다. 미하엘 슈마허와 함께한 2000년대 초반의 황금기가 특히 유명합니다.',
    careerHighlights: [
      { year: 1950, achievement: 'F1 창립 멤버로 참가' },
      { year: 1952, achievement: '첫 드라이버 챔피언십 우승' },
      { year: 1961, achievement: '첫 컨스트럭터 챔피언십 우승' },
      { year: 2000, achievement: '21년 만의 드라이버 챔피언십 우승' },
      { year: 2008, achievement: '마지막 컨스트럭터 챔피언십 우승' }
    ],
    currentSeasonStats: {
      position: 2,
      points: 52,
      wins: 0,
      podiums: 3,
      fastestLaps: 1
    },
    currentDrivers: [
      { name: 'Charles Leclerc', number: 16 },
      { name: 'Carlos Sainz', number: 55 }
    ]
  }
}; 