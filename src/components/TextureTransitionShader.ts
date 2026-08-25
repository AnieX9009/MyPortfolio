import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Custom GLSL Shader Material for Liquid Noise Texture Cross-Fade & Distortion
export const TextureTransitionMaterial = shaderMaterial(
  {
    uTime: 0,
    uProgress: 0,
    uTextureA: null,
    uTextureB: null,
    uWaveIntensity: 0.15,
  },
  /* VERTEX SHADER */
  `
    uniform float uTime;
    uniform float uProgress;
    uniform float uWaveIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);

      vec3 pos = position;

      // Wave distortion during cross-fade (peaks at progress = 0.5)
      float distortionFactor = sin(uProgress * 3.14159265);
      float wave = sin(pos.y * 5.0 + uTime * 3.0) * cos(pos.x * 5.0 + uTime * 2.0);
      pos.z += wave * uWaveIntensity * distortionFactor;

      vPosition = pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  /* FRAGMENT SHADER */
  `
    uniform float uTime;
    uniform float uProgress;
    uniform sampler2D uTextureA;
    uniform sampler2D uTextureB;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec2 uv = vUv;

      // Calculate distortion displacement during transition
      float transitionNoise = sin(uv.y * 20.0 + uTime * 4.0) * 0.03 * sin(uProgress * 3.14159265);
      vec2 distortedUv = uv + vec2(transitionNoise);

      vec4 texA = texture2D(uTextureA, distortedUv);
      vec4 texB = texture2D(uTextureB, distortedUv);

      // Smooth step cross-fade transition
      float mixProgress = smoothstep(0.0, 1.0, uProgress);
      vec4 finalColor = mix(texA, texB, mixProgress);

      // Subtle edge vignette
      float dist = length(uv - vec2(0.5));
      finalColor.rgb *= (1.0 - dist * 0.3);

      gl_FragColor = finalColor;
    }
  `
);

extend({ TextureTransitionMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      textureTransitionMaterial: any;
    }
  }
}
