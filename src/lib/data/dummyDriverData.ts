import { Driver } from '@/types/driver';

export const dummyDrivers: { [key: string]: Driver } = {
  'max-verstappen': {
    id: 'max-verstappen',
    name: 'Max Verstappen',
    number: 1,
    team: 'Red Bull Racing',
    nationality: 'NED',
    birthYear: 1997,
    podiums: 98,
    points: 2586,
    worldChampionships: 3,
    profileImage: '/images/drivers/max-verstappen.jpg',
    biography: '막스 에밀리안 베르스타펜(Max Emilian Verstappen)은 네덜란드 출신의 F1 드라이버입니다. 17세의 나이로 F1에 데뷔하여 최연소 F1 드라이버 기록을 세웠으며, 레드불 레이싱에서 3회 연속 월드 챔피언을 달성했습니다.',
    careerHighlights: [
      { year: 2015, achievement: 'F1 데뷔 (토로 로소)' },
      { year: 2016, achievement: '레드불 레이싱 승격' },
      { year: 2021, achievement: '첫 F1 월드 챔피언십 우승' },
      { year: 2022, achievement: '시즌 15승 기록으로 월드 챔피언' },
      { year: 2023, achievement: '시즌 19승 기록으로 월드 챔피언' }
    ],
    currentSeasonStats: {
      position: 1,
      points: 51,
      wins: 2,
      podiums: 2,
      fastestLaps: 1
    }
  },
  'sergio-perez': {
    id: 'sergio-perez',
    name: 'Sergio Perez',
    number: 11,
    team: 'Red Bull Racing',
    nationality: 'MEX',
    birthYear: 1990,
    podiums: 35,
    points: 1356,
    worldChampionships: 0,
    profileImage: '/images/drivers/sergio-perez.jpg',
    biography: '세르히오 페레즈는 멕시코 출신의 F1 드라이버입니다. "체코"라는 애칭으로도 알려져 있으며, 타이어 관리 능력이 뛰어난 것으로 유명합니다. 현재 레드불 레이싱에서 활약하고 있습니다.',
    careerHighlights: [
      { year: 2011, achievement: 'F1 데뷔 (자우버)' },
      { year: 2020, achievement: '첫 F1 우승 (레이싱 포인트)' },
      { year: 2021, achievement: '레드불 레이싱 합류' },
      { year: 2023, achievement: '시즌 2승 달성' }
    ],
    currentSeasonStats: {
      position: 2,
      points: 36,
      wins: 0,
      podiums: 2,
      fastestLaps: 0
    }
  }
}; 