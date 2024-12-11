'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Track3DData } from '@/types/track3D';
import TrackModel from './TrackModel';
import TrackInfo3D from './TrackInfo3D';
import LoadingSpinner from '../common/LoadingSpinner';
import * as THREE from 'three';

interface Track3DViewerProps {
  trackData: Track3DData;
}

export default function Track3DViewer({ trackData }: Track3DViewerProps) {
  const [selectedCorner, setSelectedCorner] = useState<number | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedDRS, setSelectedDRS] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[600px] bg-bg-secondary rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary bg-opacity-80 z-10">
          <LoadingSpinner />
        </div>
      )}

      <div className="absolute top-4 left-4 z-10 bg-bg-secondary bg-opacity-80 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">트랙 뷰어 컨트롤</h3>
        <div className="space-y-2">
          <button
            className="px-3 py-1 bg-f1-red text-white rounded hover:bg-opacity-90 transition-colors w-full"
            onClick={() => setSelectedCorner(null)}
          >
            전체 보기
          </button>
          <button
            className="px-3 py-1 bg-sector-blue text-white rounded hover:bg-opacity-90 transition-colors w-full"
            onClick={() => setSelectedSector(1)}
          >
            섹터 보기
          </button>
        </div>
      </div>

      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 50, 100]}
            fov={60}
          />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={50}
            maxDistance={200}
          />
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={1}
            castShadow
          />
          <TrackModel
            trackData={trackData}
            selectedCorner={selectedCorner}
            selectedSector={selectedSector}
            selectedDRS={selectedDRS}
            onLoad={() => setIsLoading(false)}
            onCornerSelect={setSelectedCorner}
            onSectorSelect={setSelectedSector}
            onDRSSelect={setSelectedDRS}
          />
        </Suspense>
      </Canvas>

      <TrackInfo3D
        trackData={trackData}
        selectedCorner={selectedCorner}
        selectedSector={selectedSector}
        selectedDRS={selectedDRS}
      />
    </div>
  );
} 