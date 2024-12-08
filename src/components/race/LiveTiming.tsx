'use client';

import { useEffect, useState } from 'react';
import { Driver, RaceSession } from '@/types/race';
import { F1ApiClient } from '@/lib/api/f1';
import { Card } from '@/components/common/Card/Card';

interface LiveTimingProps {
  className?: string;
}

export const LiveTiming = ({ className }: LiveTimingProps) => {
  const [session, setSession] = useState<RaceSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const f1Client = F1ApiClient.getInstance();
    let intervalId: NodeJS.Timeout;

    const fetchSession = async () => {
      const data = await f1Client.getCurrentSession();
      setSession(data);
      setIsLoading(false);
    };

    fetchSession();
    intervalId = setInterval(fetchSession, 5000); // 5초마다 업데이트

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[...Array(20)].map((_, i) => (
          <Card key={i} variant="race" className="h-12" />
        ))}
      </div>
    );
  }

  if (!session) {
    return (
      <Card variant="race" className="p-4 text-center">
        <p className="text-text-secondary">현재 진행 중인 세션이 없습니다</p>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* 세션 정보 */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">{session.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-text-secondary">랩</p>
            <p className="font-roboto-mono">
              {session.currentLap}/{session.totalLaps}
            </p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">기온</p>
            <p className="font-roboto-mono">{session.weather.temperature}°C</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">트랙 온도</p>
            <p className="font-roboto-mono">{session.weather.trackTemperature}°C</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">습도</p>
            <p className="font-roboto-mono">{session.weather.humidity}%</p>
          </div>
        </div>
      </div>

      {/* 드라이버 순위 */}
      <div className="space-y-2">
        {session.drivers.map((driver) => (
          <Card
            key={driver.code}
            variant="race"
            className="hover:bg-bg-tertiary transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="w-8 text-center font-bold">{driver.position}</span>
              <div className="flex-1">
                <span className="font-medium">{driver.code}</span>
                <span className="text-text-secondary text-sm ml-2">{driver.team}</span>
              </div>
              <div className="flex items-center gap-4">
                {driver.status === 'pit' && (
                  <span className="text-sm bg-safety-yellow px-2 py-1 rounded">PIT</span>
                )}
                {driver.status === 'out' && (
                  <span className="text-sm bg-flag-red px-2 py-1 rounded text-white">OUT</span>
                )}
                <span className="font-roboto-mono">{driver.lastLapTime}</span>
                <span className="font-roboto-mono text-text-secondary">
                  {driver.gapToLeader}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 