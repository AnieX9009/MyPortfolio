import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';
import FloatingGeometry from './FloatingGeometry';

interface Scene3DProps {
  mouseX: number;
  mouseY: number;
}

const CameraRig = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    // Smooth mouse-tracked camera movement with lerp
    targetPos.current.x += (mouseX * 2 - targetPos.current.x) * 0.04;
    targetPos.current.y += (-mouseY * 1.5 - targetPos.current.y) * 0.04;
    targetPos.current.z = 6;

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene3D = ({ mouseX, mouseY }: Scene3DProps) => {
  return (
    <>
      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#050508', 8, 30]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#ffffff" />
      {/* Primary accent lights for colorful glow */}
      <pointLight position={[-3, 3, 3]} intensity={3} color="#5561ff" distance={14} decay={2} />
      <pointLight position={[3, -3, -3]} intensity={2} color="#22d3ee" distance={12} decay={2} />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#a855f7" distance={10} decay={2} />
      <pointLight position={[0, 4, -4]} intensity={1} color="#7a91ff" distance={10} decay={2} />

      {/* Camera rig with mouse tracking */}
      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      {/* 3D Objects */}
      <FloatingGeometry />
      <ParticleField />
    </>
  );
};

export default Scene3D;
