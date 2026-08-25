import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ImmersiveSceneProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isMobile?: boolean;
}

// Quiet background 3D depth geometry plane
const DepthPlane = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.05 + scrollProgress * 0.5;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[12, 12, 16, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#202022"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
};

// Subtle ambient particle field
const MinimalParticles = ({ count = 400 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#202022"
        transparent
        opacity={0.25}
      />
    </points>
  );
};

// Camera Rig with scroll and mouse parallax
const CameraRig = ({ mouseX, mouseY, scrollProgress, isMobile }: { mouseX: number; mouseY: number; scrollProgress: number; isMobile: boolean }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    const targetZ = 6 - scrollProgress * 1.2;
    const targetY = -scrollProgress * 0.5;

    // Reduce pointer parallax on mobile
    const parallaxFactor = isMobile ? 0.3 : 1.2;

    targetPos.current.x = mouseX * parallaxFactor;
    targetPos.current.y = targetY + (-mouseY * parallaxFactor);
    targetPos.current.z = targetZ;

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const ImmersiveScene: React.FC<ImmersiveSceneProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
  isMobile = false,
}) => {
  return (
    <div id="webgl-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? 1 : [1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#202022" />

        <CameraRig mouseX={mouseX} mouseY={mouseY} scrollProgress={scrollProgress} isMobile={isMobile} />

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <DepthPlane scrollProgress={scrollProgress} />
        </Float>

        {!isMobile && <MinimalParticles count={500} />}
      </Canvas>
    </div>
  );
};

export default ImmersiveScene;
