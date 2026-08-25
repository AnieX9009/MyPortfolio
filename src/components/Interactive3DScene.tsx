import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import './CustomShaderMaterial';
import FloatingTextureMesh from './FloatingTextureMesh';

interface Interactive3DSceneProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  performanceTier: 'high' | 'saver';
}

// Custom Morphing Mesh using GLSL Shader
const MorphingOrb = ({ scrollProgress }: { scrollProgress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
      materialRef.current.uScrollProgress = scrollProgress;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15 + scrollProgress * Math.PI * 2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <icosahedronGeometry args={[1.5, 64]} />
      <biabianyShaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// GPU Particle Field
const ParticleField = ({ count = 1500 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color('#5561ff'), new THREE.Color('#22d3ee'), new THREE.Color('#a855f7')];

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 16 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Camera Controller with ScrollTrigger + Mouse Parallax
const CameraRig = ({ mouseX, mouseY, scrollProgress }: { mouseX: number; mouseY: number; scrollProgress: number }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    const targetZ = 6 - scrollProgress * 1.5;
    const targetY = -scrollProgress * 0.8;

    targetPos.current.x = (mouseX * 1.8);
    targetPos.current.y = targetY + (-mouseY * 1.2);
    targetPos.current.z = targetZ;

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const Interactive3DScene: React.FC<Interactive3DSceneProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
  performanceTier,
}) => {
  const particleCount = performanceTier === 'saver' ? 600 : 1500;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: performanceTier === 'high', alpha: false, powerPreference: 'high-performance' }}
        dpr={performanceTier === 'high' ? [1, 2] : 1}
      >
        <color attach="background" args={['#050508']} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" castShadow />
        <pointLight position={[-4, 3, 3]} intensity={3} color="#5561ff" distance={15} />
        <pointLight position={[4, -3, -3]} intensity={2.5} color="#22d3ee" distance={12} />
        <pointLight position={[0, 0, 4]} intensity={2} color="#a855f7" distance={10} />

        {/* Camera Rig with Parallax */}
        <CameraRig mouseX={mouseX} mouseY={mouseY} scrollProgress={scrollProgress} />

        {/* Suspense loaded floating texture plane with Shader Cross-Fade */}
        <Suspense fallback={null}>
          <FloatingTextureMesh
            scrollProgress={scrollProgress}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        </Suspense>

        {/* Morphing Shader Orb & Background Particles */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <MorphingOrb scrollProgress={scrollProgress} />
        </Float>

        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
};

export default Interactive3DScene;
