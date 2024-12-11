import { Metadata } from 'next';
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';
import LiveRaceInfo from '@/components/race/LiveRaceInfo';
import TrackInfo from '@/components/track/TrackInfo';
import { dummyTrack } from '@/lib/data/dummyTrackData';

export const metadata: Metadata = {
  title: '레이스 센터 - PitStopKorea',
  description: 'F1 실시간 경기 정보, 트랙 정보, 실시간 채팅을 제공하는 레이스 센터입니다.',
};

interface RaceCenterProps {}

export default function RaceCenter({}: RaceCenterProps) {
  const breadcrumbItems = [
    { label: '홈', href: '/' },
    { label: '레이스 센터', href: '/race-center' },
  ];

  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="container mx-auto px-4 py-4">
        <Breadcrumb items={breadcrumbItems} />
        
        <h1 className="text-3xl font-bold mt-8 mb-6 text-text-primary">레이스 센터</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 실시간 경기 정보 섹션 */}
          <section className="lg:col-span-2 space-y-6">
            <LiveRaceInfo isRaceActive={false} />
          </section>

          {/* 트랙 정보 섹션 */}
          <section>
            <TrackInfo track={dummyTrack} />
          </section>

          {/* 실시간 채팅 섹션 */}
          <section className="lg:col-span-3 bg-bg-secondary rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">실시간 채팅</h2>
            <div className="bg-bg-tertiary p-4 rounded-md shadow-sm h-[400px]">
              {/* 여기에 채팅 컴포넌트가 들어갈 예정 */}
              <p className="text-text-secondary">채팅 기능 준비중입니다.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 