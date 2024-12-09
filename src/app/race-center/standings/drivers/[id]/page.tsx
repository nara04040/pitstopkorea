import { dummyDrivers } from '@/lib/data/dummyDriverData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = await Promise.resolve(params.id);
  const driver = dummyDrivers[id];
  
  if (!driver) {
    return {
      title: '드라이버를 찾을 수 없습니다 - PitStopKorea',
    };
  }

  return {
    title: `${driver.name} - PitStopKorea`,
    description: driver.biography,
  };
}

export default function DriverPage({ params }: PageProps) {
  const driver = dummyDrivers[params.id];

  if (!driver) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8">
      <div className="container mx-auto px-4">
        {/* 드라이버 프로필 헤더 */}
        <div className="bg-bg-secondary rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-48 h-48 relative rounded-full overflow-hidden">
              <Image
                src={driver.profileImage}
                alt={driver.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-f1-red font-roboto-mono font-bold text-2xl">
                  #{driver.number}
                </span>
                <h1 className="text-3xl font-bold text-text-primary">{driver.name}</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-text-secondary text-sm">팀</p>
                  <p className="text-text-primary font-medium">{driver.team}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">국적</p>
                  <p className="text-text-primary font-medium">{driver.nationality}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">출생연도</p>
                  <p className="text-text-primary font-medium">{driver.birthYear}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">월드 챔피언십</p>
                  <p className="text-text-primary font-medium">{driver.worldChampionships}회</p>
                </div>
              </div>
              <p className="text-text-secondary">{driver.biography}</p>
            </div>
          </div>
        </div>

        {/* 현재 시즌 기록 */}
        <div className="bg-bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">2024 시즌 기록</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">순위</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {driver.currentSeasonStats.position}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">포인트</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {driver.currentSeasonStats.points}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">우승</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {driver.currentSeasonStats.wins}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">포디움</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {driver.currentSeasonStats.podiums}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">최고 랩</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {driver.currentSeasonStats.fastestLaps}
              </p>
            </div>
          </div>
        </div>

        {/* 커리어 하이라이트 */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">커리어 하이라이트</h2>
          <div className="space-y-4">
            {driver.careerHighlights.map((highlight) => (
              <div key={highlight.year} className="flex items-start gap-4">
                <span className="text-f1-red font-roboto-mono font-bold">
                  {highlight.year}
                </span>
                <p className="text-text-primary">{highlight.achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 