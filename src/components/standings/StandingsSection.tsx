'use client';

import { useState } from 'react';
import { DriverStanding, ConstructorStanding } from '@/types/standings';
import { Card } from '@/components/common/Card/Card';
import Link from 'next/link';

interface StandingsSectionProps {
  driverStandings: DriverStanding[];
  constructorStandings: ConstructorStanding[];
}

export default function StandingsSection({
  driverStandings,
  constructorStandings,
}: StandingsSectionProps) {
  const [showConstructors, setShowConstructors] = useState(false);

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <button
          className={`text-sm font-medium transition-colors ${
            !showConstructors ? 'text-f1-red' : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setShowConstructors(false)}
        >
          드라이버
        </button>
        <button
          className={`text-sm font-medium transition-colors ${
            showConstructors ? 'text-f1-red' : 'text-text-secondary hover:text-text-primary'
          }`}
          onClick={() => setShowConstructors(true)}
        >
          컨스트럭터
        </button>
      </div>

      <div className="space-y-2">
        {showConstructors
          ? constructorStandings.map((standing) => (
              <Link 
                key={standing.position} 
                href={`/race-center/standings/constructors/${standing.constructor.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card variant="race" className="hover:bg-bg-tertiary transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-roboto-mono font-bold text-lg w-8 text-text-primary">
                        {standing.position}
                      </span>
                      <div>
                        <p className="font-bold text-text-primary">{standing.constructor.name}</p>
                        <p className="text-sm text-text-secondary">
                          {standing.constructor.nationality}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-text-primary font-roboto-mono">{standing.points} pts</p>
                      <p className="text-sm text-text-secondary">
                        {standing.wins} {standing.wins === 1 ? 'win' : 'wins'}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          : driverStandings.map((standing) => (
              <Link 
                key={standing.position} 
                href={`/race-center/standings/drivers/${standing.driver.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card variant="race" className="hover:bg-bg-tertiary transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-roboto-mono font-bold text-lg w-8 text-text-primary">
                        {standing.position}
                      </span>
                      <div>
                        <p className="font-bold text-text-primary">{standing.driver.name}</p>
                        <p className="text-sm text-text-secondary">
                          {standing.driver.nationality} | {standing.driver.team}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-text-primary font-roboto-mono">{standing.points} pts</p>
                      <p className="text-sm text-text-secondary">
                        {standing.wins} {standing.wins === 1 ? 'win' : 'wins'}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
} 