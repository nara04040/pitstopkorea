import { Card } from '@/components/common/Card/Card';
import { Timer } from '@/components/common/Timer/Timer';
import { LiveTiming } from '@/components/race/LiveTiming';
import { dummyNextRace } from '@/lib/data/dummyRaceData';
import { NewsCard } from '@/components/news/NewsCard';
import { dummyNews } from '@/lib/data/dummyNewsData';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-bg-secondary to-bg-tertiary text-text-primary py-12">
        <div className="container mx-auto px-4">
          <Card variant="race" className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              {dummyNextRace.name}
            </h2>
            <Timer targetDate={dummyNextRace.date} targetTime={dummyNextRace.startTime} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-text-primary">
              <div>
                <p className="text-md font-bold">날짜</p>
                <p className="font-medium">{dummyNextRace.date.replace(/-/g, '.')} {dummyNextRace.startTime}</p>
              </div>
              <div>
                <p className="text-md font-bold">서킷</p>
                <p className="font-medium">{dummyNextRace.circuit.name}</p>
              </div>
              <div>
                <p className="text-md font-bold">랩 수</p>
                <p className="font-medium">{dummyNextRace.totalLaps} Laps</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 실시간 레이스 정보 */}
      <section className="py-8 bg-bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-text-primary mb-6">실시간 순위</h2>
          <LiveTiming />
        </div>
      </section>

      {/* 최신 뉴스 */}
      <section className="py-8 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-text-primary mb-6">최신 뉴스</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyNews.map((news, index) => (
              <NewsCard 
                key={news.id} 
                news={news}
                priority={index === 0}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              href="/news" 
              className="inline-flex items-center text-f1-red hover:text-f1-red-dark transition-colors"
            >
              모든 뉴스 보기
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 순위표 */}
      <section className="py-8 bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-primary">챔피언십 순위</h2>
            <div className="flex gap-4">
              <button className="text-sm font-medium text-f1-red">드라이버</button>
              <button className="text-sm font-medium text-text-secondary">컨스트럭터</button>
            </div>
          </div>
          <div className="space-y-2">
            <Card variant="race" className="hover:bg-bg-tertiary">
              <div className="flex items-center gap-4">
                <span className="w-8 text-center font-bold">1</span>
                <span className="font-medium">Max Verstappen</span>
                <span className="ml-auto font-roboto-mono">51 pts</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 다가오는 레이스 */}
      <section className="py-8 bg-bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-text-primary mb-6">다가오는 레이스</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card variant="race" className="hover:shadow-lg transition-shadow">
              <div className="text-sm text-text-secondary mb-2">ROUND 5</div>
              <h3 className="font-bold mb-1 text-text-primary">Chinese Grand Prix</h3>
              <p className="text-sm text-text-secondary mb-4">Shanghai International Circuit</p>
              <div className="font-roboto-mono text-sm">2024.04.21</div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
