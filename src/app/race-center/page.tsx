import { Metadata } from 'next';
import { Breadcrumb } from '@/components/common/Breadcrumb/Breadcrumb';
import LiveRaceInfo from '@/components/race/LiveRaceInfo';

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
        
        <h1 className="text-3xl font-bold mt-8 mb-6">레이스 센터</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-bg-primary rounded-lg p-6">
          {/* 실시간 경기 정보 섹션 */}
          <section className="lg:col-span-2 space-y-6 bg-bg-tertiary rounded-lg p-6">
            <LiveRaceInfo isRaceActive={false} />
          </section>

          {/* 트랙 정보 섹션 */}
          <section className="bg-bg-tertiary rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">트랙 정보</h2>
            <div className="space-y-4">
              {/* 여기에 트랙 맵, 섹터 정보 등이 들어갈 예정 */}
              <div className="bg-bg-secondary p-4 rounded-md shadow-sm">
                <p className="text-gray-500">트랙 정보를 불러오는 중...</p>
              </div>
            </div>
          </section>

          {/* 실시간 채팅 섹션 */}
          <section className="lg:col-span-3 bg-bg-secondary rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">실시간 채팅</h2>
            <div className="bg-bg-secondary p-4 rounded-md shadow-sm h-[400px]">
              {/* 여기에 채팅 컴포넌트가 들어갈 예정 */}
              <p className="text-gray-500">채팅 기능 준비중입니다.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
} 