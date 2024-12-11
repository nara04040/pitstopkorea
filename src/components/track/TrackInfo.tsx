import { Track } from '@/types/track';
import InteractiveTrackMap from './InteractiveTrackMap';
import TrackRecords from './TrackRecords';

interface TrackInfoProps {
  track: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="space-y-6">
      {/* 기본 트랙 정보 */}
      <div className="bg-bg-secondary rounded-lg p-4 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">{track.name}</h2>
        <div className="space-y-2 text-text-secondary">
          <p>위치: {track.location}</p>
          <p>트랙 길이: {track.length}km</p>
          <p>코너 수: {track.turns}개</p>
          <p className="text-text-primary mt-4">{track.description}</p>
        </div>
      </div>

      {/* 인터랙티브 트랙 맵 */}
      <InteractiveTrackMap track={track} />

      {/* 트랙 기록 */}
      <TrackRecords records={track.records} />
    </div>
  );
} 