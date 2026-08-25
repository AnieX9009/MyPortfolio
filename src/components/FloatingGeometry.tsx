import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Torus, Icosahedron, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Animated wireframe torus ring
const AnimatedTorus = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[2.2, 0.04, 16, 100]} />
      <meshBasicMaterial color="#5561ff" transparent opacity={0.6} />
    </mesh>
  );
};

// Outer torus ring
const AnimatedTorus2 = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.3;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusGeometry args={[3.0, 0.025, 16, 100]} />
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
    </mesh>
  );
};

// Central glowing sphere
const GlowSphere = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
    ref.current.scale.setScalar(s);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.1, 64, 64]} />
      <MeshDistortMaterial
        color="#3d3df7"
        emissive="#5561ff"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.8}
        distort={0.3}
        speed={2}
      />
    </mesh>
  );
};

// Floating icosahedron
const FloatingIco = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.4;
    ref.current.rotation.y = state.clock.elapsedTime * 0.6;
    ref.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    ref.current.position.x = 3 + Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <mesh ref={ref} position={[3, 2.5, -1]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={0.3}
        wireframe={false}
        roughness={0.2}
        metalness={0.9}
      />
    </mesh>
  );
};

// Floating octahedron
const FloatingOcta = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.5;
    ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.4;
    ref.current.position.x = -3 + Math.cos(state.clock.elapsedTime * 0.4) * 0.3;
  });

  return (
    <mesh ref={ref} position={[-3, -2, -0.5]}>
      <octahedronGeometry args={[0.6, 0]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.9}
      />
    </mesh>
  );
};

const FloatingGeometry = () => {
  return (
    <group>
      <GlowSphere />
      <AnimatedTorus />
      <AnimatedTorus2 />
      <FloatingIco />
      <FloatingOcta />
    </group>
  );
};

export default FloatingGeometry;
