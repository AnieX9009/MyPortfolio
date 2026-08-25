import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import './TextureTransitionShader';

interface FloatingTextureMeshProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

export const ASSET_URLS = {
  hero: 'https://framerusercontent.com/images/3dpALmvrIR88qPmbDlYoTyJSig.png',
  about: 'https://framerusercontent.com/images/mu5aNnkWAjYtvDiHohADlAIYc.jpeg',
  figma: 'https://framerusercontent.com/images/Pxfjp142gBOSoN5QAIirhUygA.png',
  webflow: 'https://framerusercontent.com/modules/tVandTqweuNtJIhNnnZM/30SN12tcSdSYw5DNx3OQ/assets/HmBMlHkeEZXQBLyDiqXgKUV3Oo.png',
  framer: 'https://framerusercontent.com/modules/1Gy9TEqjsubkyh0xgKdK/EHiVx1KzVHCD1uSbqGxq/assets/512/TPaNAECLGszNKIgydxoQyi8w8nw.png',
  visual1: 'https://framerusercontent.com/images/yDkponc9HbYCJwvkwUFvgHd9zHI.png',
  visual2: 'https://framerusercontent.com/images/UNO1Ze0cuGnVgrOJ7ELDulVa5b4.png',
};

export const FloatingTextureMesh: React.FC<FloatingTextureMeshProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<any>(null);

  // Load textures via Drei useTexture
  const textures = useTexture([
    ASSET_URLS.hero,
    ASSET_URLS.about,
    ASSET_URLS.figma,
    ASSET_URLS.visual1,
  ]);

  const [currentTexIndex, setCurrentTexIndex] = useState(0);
  const [nextTexIndex, setNextTexIndex] = useState(1);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Target vectors for lerped transformations across sections
  const targetPosition = useRef(new THREE.Vector3(2, 0, 0));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));
  const targetScale = useRef(new THREE.Vector3(2.2, 2.2, 1));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Section 1: Hero (scrollProgress: 0 -> 0.25)
    // Section 2: Work/About (scrollProgress: 0.25 -> 0.5)
    // Section 3: Experience/Stack (scrollProgress: 0.5 -> 0.75)
    // Section 4: Contact/Footer (scrollProgress: 0.75 -> 1.0)

    let texA = 0;
    let texB = 1;
    let localProg = 0;

    if (scrollProgress < 0.25) {
      // Section 1: Hero
      targetPosition.current.set(2.0, Math.sin(time * 1.5) * 0.15, 0);
      targetRotation.current.set(0, -0.2, 0);
      targetScale.current.set(2.4, 2.4, 1);
      texA = 0;
      texB = 1;
      localProg = scrollProgress / 0.25;
    } else if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
      // Section 2: Work / Case Study
      targetPosition.current.set(-2.0, -0.5 + Math.sin(time * 1.5) * 0.15, 0.5);
      targetRotation.current.set(0.2, 0.5, -0.1);
      targetScale.current.set(2.2, 2.2, 1);
      texA = 1;
      texB = 2;
      localProg = (scrollProgress - 0.25) / 0.25;
    } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
      // Section 3: Experience & Stack
      targetPosition.current.set(0, Math.sin(time * 1.8) * 0.1, 1.0);
      targetRotation.current.set(0, Math.sin(time * 0.5) * 0.15, 0);
      targetScale.current.set(1.8, 1.8, 1);
      texA = 2;
      texB = 3;
      localProg = (scrollProgress - 0.5) / 0.25;
    } else {
      // Section 4: Contact / FAQ
      targetPosition.current.set(1.8, -1.0 + Math.sin(time * 1.2) * 0.15, 0);
      targetRotation.current.set(0.1, -0.1, 0.05);
      targetScale.current.set(2.5, 2.5, 1);
      texA = 3;
      texB = 0;
      localProg = (scrollProgress - 0.75) / 0.25;
    }

    // Apply mouse parallax tilt on top of target rotation
    const parallaxX = mouseX * 0.3;
    const parallaxY = mouseY * 0.3;

    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition.current, 0.06);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation.current.x + parallaxY, 0.06);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation.current.y + parallaxX, 0.06);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotation.current.z, 0.06);
      meshRef.current.scale.lerp(targetScale.current, 0.06);
    }

    // Update custom GLSL shader uniforms
    if (shaderRef.current) {
      shaderRef.current.uTime = time;
      shaderRef.current.uProgress = localProg;
      shaderRef.current.uTextureA = textures[texA];
      shaderRef.current.uTextureB = textures[texB];
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <planeGeometry args={[1.6, 1.6, 32, 32]} />
      <textureTransitionMaterial
        ref={shaderRef}
        uTextureA={textures[0]}
        uTextureB={textures[1]}
        transparent
      />
    </mesh>
  );
};

export default FloatingTextureMesh;
