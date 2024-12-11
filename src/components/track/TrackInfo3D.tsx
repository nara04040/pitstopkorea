'use client';

import { Track3DData } from '@/types/track3D';

interface TrackInfo3DProps {
  trackData: Track3DData;
  selectedCorner: number | null;
  selectedSector: number | null;
  selectedDRS: number | null;
}

export default function TrackInfo3D({
  trackData,
  selectedCorner,
  selectedSector,
  selectedDRS
}: TrackInfo3DProps) {
  // 선택된 코너 정보
  const selectedCornerInfo = selectedCorner
    ? trackData.corners.find(corner => corner.number === selectedCorner)
    : null;

  // 선택된 섹터 정보
  const selectedSectorInfo = selectedSector
    ? trackData.sectors.find(sector => sector.number === selectedSector)
    : null;

  // 선택된 DRS 존 정보
  const selectedDRSInfo = selectedDRS
    ? trackData.drsZones.find(drs => drs.number === selectedDRS)
    : null;

  if (!selectedCornerInfo && !selectedSectorInfo && !selectedDRSInfo) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-bg-secondary bg-opacity-80 p-4 rounded-lg max-w-sm">
      {selectedCornerInfo && (
        <div className="mb-4">
          <h4 className="text-lg font-bold text-f1-red">
            코너 {selectedCornerInfo.number}
            {selectedCornerInfo.name && ` - ${selectedCornerInfo.name}`}
          </h4>
          <p className="text-sm text-text-secondary mt-1">
            타입: {
              selectedCornerInfo.type === 'slow' ? '저속' :
              selectedCornerInfo.type === 'medium' ? '중속' : '고속'
            } 코너
          </p>
          <p className="text-sm text-text-secondary">
            각도: {selectedCornerInfo.angle}°
          </p>
        </div>
      )}

      {selectedSectorInfo && (
        <div className="mb-4">
          <h4 className="text-lg font-bold" style={{ color: selectedSectorInfo.color }}>
            섹터 {selectedSectorInfo.number}
          </h4>
          <p className="text-sm text-text-secondary">
            구간 거리: {
              Math.round(
                Math.sqrt(
                  Math.pow(selectedSectorInfo.endPosition.x - selectedSectorInfo.startPosition.x, 2) +
                  Math.pow(selectedSectorInfo.endPosition.z - selectedSectorInfo.startPosition.z, 2)
                )
              )
            }m
          </p>
        </div>
      )}

      {selectedDRSInfo && (
        <div>
          <h4 className="text-lg font-bold text-drs-green">
            DRS 존 {selectedDRSInfo.number}
          </h4>
          <p className="text-sm text-text-secondary">
            구간 거리: {
              Math.round(
                Math.sqrt(
                  Math.pow(selectedDRSInfo.endPosition.x - selectedDRSInfo.startPosition.x, 2) +
                  Math.pow(selectedDRSInfo.endPosition.z - selectedDRSInfo.startPosition.z, 2)
                )
              )
            }m
          </p>
        </div>
      )}
    </div>
  );
} 