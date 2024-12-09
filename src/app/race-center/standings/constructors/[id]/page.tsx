import { dummyConstructors } from '@/lib/data/dummyConstructorData';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const constructor = dummyConstructors[params.id];

  if (!constructor) {
    return {
      title: 'Constructor Not Found - PitStopKorea',
    };
  }

  return {
    title: `${constructor.name} - F1 Constructor Profile - PitStopKorea`,
    description: constructor.biography,
    openGraph: {
      title: `${constructor.name} - F1 Constructor Profile`,
      description: constructor.biography,
      images: [constructor.profileImage],
    },
  };
}

export default function ConstructorPage({ params }: PageProps) {
  const constructor = dummyConstructors[params.id];

  if (!constructor) {
    notFound();
  }

  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '레이스 센터', href: '/race-center' },
    { label: '순위', href: '/race-center/standings' },
    { label: '컨스트럭터', href: '/race-center/standings/constructors' },
    { label: constructor.name, href: `/race-center/standings/constructors/${params.id}` },
  ];

  return (
    <div className="min-h-screen bg-bg-primary py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb items={breadcrumbItems} />
        
        {/* 컨스트럭터 프로필 헤더 */}
        <div className="bg-bg-secondary rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-48 h-48 relative rounded-lg overflow-hidden">
              <Image
                src={constructor.profileImage}
                alt={constructor.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-text-primary">{constructor.fullName}</h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-text-secondary text-sm">본부</p>
                  <p className="text-text-primary font-medium">{constructor.base}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">팀 대표</p>
                  <p className="text-text-primary font-medium">{constructor.teamPrincipal}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">설립연도</p>
                  <p className="text-text-primary font-medium">{constructor.founded}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">월드 챔피언십</p>
                  <p className="text-text-primary font-medium">{constructor.worldChampionships}회</p>
                </div>
              </div>
              <p className="text-text-secondary">{constructor.biography}</p>
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
                {constructor.currentSeasonStats.position}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">포인트</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {constructor.currentSeasonStats.points}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">우승</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {constructor.currentSeasonStats.wins}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">포디움</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {constructor.currentSeasonStats.podiums}
              </p>
            </div>
            <div className="bg-bg-tertiary p-4 rounded-lg">
              <p className="text-text-secondary text-sm">최고 랩</p>
              <p className="text-text-primary text-2xl font-roboto-mono font-bold">
                {constructor.currentSeasonStats.fastestLaps}
              </p>
            </div>
          </div>
        </div>

        {/* 현재 드라이버 */}
        <div className="bg-bg-secondary rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">2024 시즌 드라이버</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {constructor.currentDrivers.map((driver) => (
              <div key={driver.number} className="bg-bg-tertiary p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-f1-red font-roboto-mono font-bold">#{driver.number}</span>
                  <span className="text-text-primary font-medium">{driver.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 커리어 하이라이트 */}
        <div className="bg-bg-secondary rounded-lg p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">커리어 하이라이트</h2>
          <div className="space-y-4">
            {constructor.careerHighlights.map((highlight) => (
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