'use client';

import { useEffect, useMemo } from 'react';
import { Vector3 } from 'three';
import { Track3DData } from '@/types/track3D';
import { Canvas, extend, useThree } from '@react-three/fiber';
import { Line, Sphere, Plane } from '@react-three/drei';
import { CatmullRomCurve3 } from 'three';
import * as THREE from 'three';

extend(THREE);

interface TrackModelProps {
  trackData: Track3DData;
  selectedCorner: number | null;
  selectedSector: number | null;
  selectedDRS: number | null;
  onLoad: () => void;
  onCornerSelect: (corner: number | null) => void;
  onSectorSelect: (sector: number | null) => void;
  onDRSSelect: (drs: number | null) => void;
}

export default function TrackModel({
  trackData,
  selectedCorner,
  selectedSector,
  selectedDRS,
  onLoad,
  onCornerSelect,
  onSectorSelect,
  onDRSSelect
}: TrackModelProps) {
  const { scene } = useThree();

  // 트랙 경로를 3D 스플라인 커브로 변환
  const trackCurve = useMemo(() => {
    const points = trackData.trackPath.map(
      point => new Vector3(point.x, point.y, point.z)
    );
    return new CatmullRomCurve3(points, true);
  }, [trackData.trackPath]);

  // 컴포넌트 로드 완료 시 알림
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <>
      <Line
        points={trackCurve.getPoints(200)}
        color="#333333"
        lineWidth={trackData.trackWidth}
      />

      {trackData.corners.map((corner) => (
        <mesh key={corner.number}>
          <Sphere
            args={[2, 32, 32]}
            position={[corner.position.x, corner.position.y, corner.position.z]}
            onClick={() => onCornerSelect(corner.number)}
          >
            <meshStandardMaterial
              color={selectedCorner === corner.number ? '#FF1801' : '#666666'}
              emissive={selectedCorner === corner.number ? '#FF1801' : '#000000'}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </mesh>
      ))}

      {trackData.drsZones.map((drs, index) => (
        <mesh key={index}>
          <Line
            points={[
              new Vector3(drs.startPosition.x, drs.startPosition.y, drs.startPosition.z),
              new Vector3(drs.endPosition.x, drs.endPosition.y, drs.endPosition.z)
            ]}
            color={selectedDRS === drs.number ? '#00FF00' : '#00CC00'}
            lineWidth={2}
          />
        </mesh>
      ))}

      {trackData.sectors.map((sector) => (
        <mesh key={sector.number}>
          <Line
            points={[
              new Vector3(sector.startPosition.x, sector.startPosition.y, sector.startPosition.z),
              new Vector3(sector.endPosition.x, sector.endPosition.y, sector.endPosition.z)
            ]}
            color={selectedSector === sector.number ? sector.color : '#666666'}
            lineWidth={3}
          />
        </mesh>
      ))}

      <mesh
        position={[trackData.startLine.x, trackData.startLine.y, trackData.startLine.z]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <Plane args={[trackData.trackWidth, 1]}>
          <meshStandardMaterial color="#FF1801" />
        </Plane>
      </mesh>
    </>
  );
} 