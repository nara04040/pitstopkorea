'use client';

import { Track, TrackCorner, TrackDRSZone, TrackSector } from '@/types/track';
import { useState } from 'react';

interface InteractiveTrackMapProps {
  track: Track;
}

interface InfoPopupProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  position: { x: number; y: number };
}

function InfoPopup({ title, children, onClose, position }: InfoPopupProps) {
  return (
    <div
      className="absolute bg-bg-secondary rounded-lg p-4 shadow-lg z-50 w-64"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)'
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-text-secondary hover:text-text-primary"
      >
        ✕
      </button>
      <h4 className="text-text-primary font-bold mb-2">{title}</h4>
      <div className="text-text-secondary text-sm">{children}</div>
    </div>
  );
}

export default function InteractiveTrackMap({ track }: InteractiveTrackMapProps) {
  const [selectedCorner, setSelectedCorner] = useState<TrackCorner | null>(null);
  const [selectedSector, setSelectedSector] = useState<TrackSector | null>(null);
  const [selectedDRS, setSelectedDRS] = useState<TrackDRSZone | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const handleElementClick = (
    e: React.MouseEvent,
    element: TrackCorner | TrackSector | TrackDRSZone,
    type: 'corner' | 'sector' | 'drs'
  ) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });

    if (type === 'corner') {
      setSelectedCorner(element as TrackCorner);
      setSelectedSector(null);
      setSelectedDRS(null);
    } else if (type === 'sector') {
      setSelectedSector(element as TrackSector);
      setSelectedCorner(null);
      setSelectedDRS(null);
    } else {
      setSelectedDRS(element as TrackDRSZone);
      setSelectedCorner(null);
      setSelectedSector(null);
    }
  };

  const closePopup = () => {
    setSelectedCorner(null);
    setSelectedSector(null);
    setSelectedDRS(null);
  };

  return (
    <div className="relative bg-bg-secondary rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-text-primary">트랙 맵</h3>
      
      <div className="relative">
        {/* 트랙 이미지 */}
        <div className="relative w-full aspect-video bg-bg-tertiary rounded-md overflow-hidden">
          <img
            src={track.mapImage}
            alt={`${track.name} 트랙 맵`}
            className="w-full h-full object-contain"
          />
          
          {/* 인터랙티브 요소들 */}
          <div className="absolute inset-0">
            {/* 코너 마커 */}
            {track.corners.map((corner) => (
              <button
                key={corner.number}
                onClick={(e) => handleElementClick(e, corner, 'corner')}
                className="absolute w-6 h-6 bg-f1-red rounded-full text-white text-xs flex items-center justify-center hover:bg-opacity-80 transition-colors"
                style={{
                  // 실제 구현 시에는 각 코너의 정확한 위치 좌표가 필요합니다
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {corner.number}
              </button>
            ))}

            {/* DRS 존 표시 */}
            {track.drsZones.map((drs, index) => (
              <button
                key={index}
                onClick={(e) => handleElementClick(e, drs, 'drs')}
                className="absolute px-2 py-1 bg-green-500 bg-opacity-50 text-white text-xs rounded hover:bg-opacity-70 transition-colors"
                style={{
                  // 실제 구현 시에는 각 DRS 존의 정확한 위치 좌표가 필요합니다
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                DRS {drs.number}
              </button>
            ))}
          </div>
        </div>

        {/* 정보 팝업 */}
        {selectedCorner && (
          <InfoPopup
            title={`코너 ${selectedCorner.number}${selectedCorner.name ? ` - ${selectedCorner.name}` : ''}`}
            onClose={closePopup}
            position={popupPosition}
          >
            <p>{selectedCorner.description}</p>
            <p className="mt-1">
              코너 타입: {selectedCorner.type === 'slow' ? '저속' : selectedCorner.type === 'medium' ? '중속' : '고속'}
            </p>
          </InfoPopup>
        )}

        {selectedSector && (
          <InfoPopup
            title={`섹터 ${selectedSector.number}`}
            onClose={closePopup}
            position={popupPosition}
          >
            <p>{selectedSector.characteristics}</p>
            <p className="mt-1">길이: {selectedSector.length}km</p>
            <p>최고 속도: {selectedSector.topSpeed}km/h</p>
          </InfoPopup>
        )}

        {selectedDRS && (
          <InfoPopup
            title={`DRS 존 ${selectedDRS.number}`}
            onClose={closePopup}
            position={popupPosition}
          >
            <p>길이: {selectedDRS.length}km</p>
            <p className="mt-1">감지 지점: {selectedDRS.detectionPoint}</p>
            <p>활성화 지점: {selectedDRS.activationPoint}</p>
          </InfoPopup>
        )}
      </div>

      {/* 범례 */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-f1-red rounded-full" />
          <span>코너</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500" />
          <span>DRS 존</span>
        </div>
      </div>
    </div>
  );
} 