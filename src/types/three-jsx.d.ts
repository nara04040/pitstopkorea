import { ThreeElements } from '@react-three/fiber';
import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: JSX.IntrinsicElements['mesh'];
      meshStandardMaterial: JSX.IntrinsicElements['meshStandardMaterial'];
      ambientLight: JSX.IntrinsicElements['ambientLight'];
      directionalLight: JSX.IntrinsicElements['directionalLight'];
      sphereGeometry: JSX.IntrinsicElements['sphereGeometry'];
      lineGeometry: JSX.IntrinsicElements['lineGeometry'];
      line: JSX.IntrinsicElements['line'];
      sphere: JSX.IntrinsicElements['sphere'];
      plane: JSX.IntrinsicElements['plane'];
    }
  }
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    meshStandardMaterial: Object3DNode<THREE.MeshStandardMaterial, typeof THREE.MeshStandardMaterial>;
    ambientLight: Object3DNode<THREE.AmbientLight, typeof THREE.AmbientLight>;
    directionalLight: Object3DNode<THREE.DirectionalLight, typeof THREE.DirectionalLight>;
    sphereGeometry: Object3DNode<THREE.SphereGeometry, typeof THREE.SphereGeometry>;
    lineGeometry: Object3DNode<THREE.BufferGeometry, typeof THREE.BufferGeometry>;
    line: Object3DNode<THREE.Line, typeof THREE.Line>;
    sphere: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
    plane: Object3DNode<THREE.Mesh, typeof THREE.Mesh>;
  }
}

export {}; 