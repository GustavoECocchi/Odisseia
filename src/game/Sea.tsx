import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vWave;

  void main() {
    vec3 displaced = position;
    float broadWave = sin(position.x * 0.16 + uTime * 0.85) * 0.24;
    float crossWave = cos(position.y * 0.22 - uTime * 0.62) * 0.16;
    float detailWave = sin((position.x + position.y) * 0.42 + uTime * 1.15) * 0.05;
    displaced.z += broadWave + crossWave + detailWave;
    vWave = displaced.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vWave;

  void main() {
    vec3 deep = vec3(0.025, 0.25, 0.38);
    vec3 crest = vec3(0.11, 0.55, 0.66);
    float mixValue = smoothstep(-0.38, 0.42, vWave);
    vec3 color = mix(deep, crest, mixValue);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Sea() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.35} receiveShadow>
      <planeGeometry args={[100, 100, 96, 96]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}
