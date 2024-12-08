import { Driver, RaceSession, NextRace } from '@/types/race';

// 드라이버 더미 데이터
export const dummyDrivers: Driver[] = [
  {
    position: 1,
    code: 'VER',
    number: '1',
    firstName: 'Max',
    lastName: 'Verstappen',
    team: 'Red Bull Racing',
    lastLapTime: '1:32.564',
    gapToLeader: 'LEADER',
    status: 'running',
    sector1Time: '28.453',
    sector2Time: '31.256',
    sector3Time: '32.855',
    bestLapTime: '1:31.987',
    tyreCompound: 'medium',
    tyreAge: 12,
  },
  {
    position: 2,
    code: 'PER',
    number: '11',
    firstName: 'Sergio',
    lastName: 'Perez',
    team: 'Red Bull Racing',
    lastLapTime: '1:32.789',
    gapToLeader: '+3.245',
    status: 'running',
    sector1Time: '28.567',
    sector2Time: '31.345',
    sector3Time: '32.877',
    bestLapTime: '1:32.123',
    tyreCompound: 'hard',
    tyreAge: 18,
  },
  {
    position: 3,
    code: 'HAM',
    number: '44',
    firstName: 'Lewis',
    lastName: 'Hamilton',
    team: 'Mercedes',
    lastLapTime: '1:32.901',
    gapToLeader: '+5.678',
    status: 'running',
    sector1Time: '28.612',
    sector2Time: '31.421',
    sector3Time: '32.868',
    bestLapTime: '1:32.245',
    tyreCompound: 'medium',
    tyreAge: 15,
  },
  {
    position: 4,
    code: 'LEC',
    number: '16',
    firstName: 'Charles',
    lastName: 'Leclerc',
    team: 'Ferrari',
    lastLapTime: '1:33.012',
    gapToLeader: '+8.432',
    status: 'running',
    sector1Time: '28.734',
    sector2Time: '31.456',
    sector3Time: '32.822',
    bestLapTime: '1:32.456',
    tyreCompound: 'soft',
    tyreAge: 8,
  },
  {
    position: 5,
    code: 'SAI',
    number: '55',
    firstName: 'Carlos',
    lastName: 'Sainz',
    team: 'Ferrari',
    lastLapTime: '1:33.123',
    gapToLeader: '+10.234',
    status: 'pit',
    sector1Time: '28.845',
    sector2Time: '31.567',
    sector3Time: '32.711',
    bestLapTime: '1:32.567',
    tyreCompound: 'soft',
    tyreAge: 20,
  },
];

// 현재 세션 더미 데이터
export const dummyCurrentSession: RaceSession = {
  type: 'race',
  name: 'FORMULA 1 JAPANESE GRAND PRIX 2024',
  circuit: {
    name: 'Suzuka International Racing Course',
    country: 'Japan',
    length: 5.807,
    totalLaps: 53,
  },
  currentLap: 23,
  totalLaps: 53,
  weather: {
    temperature: 22,
    trackTemperature: 30,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    precipitation: 0,
  },
  drivers: dummyDrivers,
};

// 날씨 업데이트 시뮬레이션
export function getUpdatedWeather() {
  return {
    temperature: 22 + Math.random() * 2 - 1, // 21-23도 사이 변동
    trackTemperature: 30 + Math.random() * 4 - 2, // 28-32도 사이 변동
    humidity: 65 + Math.random() * 10 - 5, // 60-70% 사이 변동
    windSpeed: 12 + Math.random() * 4 - 2, // 10-14 km/h 사이 변동
    windDirection: 'NW',
    precipitation: Math.random() < 0.1 ? Math.random() * 0.5 : 0, // 10% 확률로 약한 비
  };
}

// 랩타임 업데이트 시뮬레이션
export function getUpdatedLapTime(baseTime: string): string {
  const [minutes, seconds] = baseTime.split(':').map(Number);
  const totalSeconds = minutes * 60 + seconds;
  const variation = (Math.random() * 0.6 - 0.3); // ±0.3초 변동
  const newTotalSeconds = totalSeconds + variation;
  const newMinutes = Math.floor(newTotalSeconds / 60);
  const newSeconds = (newTotalSeconds % 60).toFixed(3);
  return `${newMinutes}:${newSeconds.padStart(6, '0')}`;
}

// 타이어 상태 업데이트 시뮬레이션
export function getUpdatedTyreAge(currentAge: number): number {
  return currentAge + 1;
}

// 실시간 세션 업데이트 시뮬레이션
export function getUpdatedSession(currentSession: RaceSession): RaceSession {
  return {
    ...currentSession,
    currentLap: currentSession.currentLap < currentSession.totalLaps 
      ? currentSession.currentLap + 1 
      : currentSession.currentLap,
    weather: getUpdatedWeather(),
    drivers: currentSession.drivers.map(driver => ({
      ...driver,
      lastLapTime: getUpdatedLapTime(driver.lastLapTime),
      tyreAge: driver.tyreAge ? getUpdatedTyreAge(driver.tyreAge) : 1,
      // 랜덤하게 피트스톱 상태 변경 (5% 확률)
      status: Math.random() < 0.05 ? 'pit' : driver.status,
    })),
  };
}

// 다음 레이스 더미 데이터
export const dummyNextRace: NextRace = {
  name: 'FORMULA 1 ETIHAD AIRWAYS ABU DHABI GRAND PRIX 2024',
  circuit: {
    name: 'Yas Marina Circuit',
    country: 'United Arab Emirates',
  },
  date: '2024-12-08',
  startTime: '22:00',
  round: 24,
  totalLaps: 58,
}; 