import { Driver, RaceSession, NextRace } from '@/types/race';
import { dummyCurrentSession, dummyDrivers, getUpdatedSession } from '../data/dummyRaceData';

const API_BASE_URL = process.env.NEXT_PUBLIC_F1_API_URL;
const API_LIMIT = process.env.NEXT_PUBLIC_F1_API_LIMIT || '30';

interface ErgastResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    [key: string]: any;
  } & T;
}

interface RaceTable {
  Races: Array<{
    season: string;
    round: string;
    url: string;
    raceName: string;
    Circuit: {
      circuitId: string;
      url: string;
      circuitName: string;
      Location: {
        lat: string;
        long: string;
        locality: string;
        country: string;
      };
    };
    date: string;
    time: string;
  }>;
}

interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructors: Array<{
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  }>;
}

export class F1ApiClient {
  private static instance: F1ApiClient;
  private currentSession: RaceSession | null = null;
  private updateInterval: number | null = null;

  private constructor() {
    // 초기 세션 설정
    this.currentSession = dummyCurrentSession;
  }

  static getInstance(): F1ApiClient {
    if (!this.instance) {
      this.instance = new F1ApiClient();
    }
    return this.instance;
  }

  private async fetchJson<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}.json`);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return response.json();
  }

  // 실시간 세션 데이터 시뮬레이션 시작
  private startSessionSimulation() {
    if (this.updateInterval) return;
    
    this.updateInterval = window.setInterval(() => {
      if (this.currentSession) {
        this.currentSession = getUpdatedSession(this.currentSession);
      }
    }, 5000); // 5초마다 업데이트
  }

  // 시뮬레이션 중지
  private stopSessionSimulation() {
    if (this.updateInterval) {
      window.clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  async getCurrentSession(): Promise<RaceSession | null> {
    // 실제 API 대신 더미 데이터 사용
    if (!this.currentSession) {
      this.currentSession = dummyCurrentSession;
      this.startSessionSimulation();
    }
    return this.currentSession;
  }

  async getNextRace(): Promise<NextRace | null> {
    try {
      const currentYear = new Date().getFullYear();
      const response = await this.fetchJson<ErgastResponse<{RaceTable: RaceTable}>>(`/${currentYear}/next`);
      
      const nextRace = response.MRData.RaceTable.Races[0];
      if (!nextRace) return null;

      return {
        name: nextRace.raceName,
        circuit: {
          name: nextRace.Circuit.circuitName,
          country: nextRace.Circuit.Location.country,
        },
        date: nextRace.date,
        startTime: nextRace.time,
        round: parseInt(nextRace.round),
        totalLaps: 53, // 서킷별 랩 수는 하드코딩
      };
    } catch (error) {
      console.error('Failed to fetch next race:', error);
      return null;
    }
  }

  async getDriverStandings(): Promise<Driver[] | null> {
    try {
      const currentYear = new Date().getFullYear();
      const response = await this.fetchJson<ErgastResponse<{
        StandingsTable: {
          StandingsLists: Array<{
            DriverStandings: DriverStanding[];
          }>;
        };
      }>>(`/${currentYear}/driverStandings`);

      const standings = response.MRData.StandingsTable.StandingsLists[0]?.DriverStandings;
      if (!standings) return null;

      return standings.map(standing => ({
        position: parseInt(standing.position),
        code: standing.Driver.code,
        number: standing.Driver.permanentNumber,
        firstName: standing.Driver.givenName,
        lastName: standing.Driver.familyName,
        team: standing.Constructors[0]?.name || 'Unknown Team',
        lastLapTime: '', // 실시간 데이터 없음
        gapToLeader: '', // 실시간 데이터 없음
        status: 'running',
      }));
    } catch (error) {
      console.error('Failed to fetch driver standings:', error);
      return null;
    }
  }

  // 컴포넌트 언마운트 시 호출
  cleanup() {
    this.stopSessionSimulation();
  }
} 