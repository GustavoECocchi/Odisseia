import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying float vWave;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  float wave(vec2 p) {
    float broadWave = sin(p.x * 0.16 + uTime * 0.85) * 0.24;
    float crossWave = cos(p.y * 0.22 - uTime * 0.62) * 0.16;
    float detailWave = sin((p.x + p.y) * 0.42 + uTime * 1.15) * 0.05;
    return broadWave + crossWave + detailWave;
  }

  void main() {
    vec3 displaced = position;
    displaced.z += wave(position.xy);
    vWave = displaced.z;

    float eps = 0.35;
    float heightRight = wave(position.xy + vec2(eps, 0.0));
    float heightUp = wave(position.xy + vec2(0.0, eps));
    vec3 tangentX = normalize(vec3(eps, 0.0, heightRight - vWave));
    vec3 tangentY = normalize(vec3(0.0, eps, heightUp - vWave));
    vNormal = normalMatrix * normalize(cross(tangentX, tangentY));

    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vWorldPosition = worldPosition.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uCameraPosition;
  varying float vWave;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 deep = vec3(0.025, 0.25, 0.38);
    vec3 crest = vec3(0.11, 0.55, 0.66);
    float mixValue = smoothstep(-0.38, 0.42, vWave);
    vec3 color = mix(deep, crest, mixValue);

    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(vec3(-12.0, 18.0, 9.0));
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    vec3 halfVector = normalize(lightDir + viewDir);

    float sparkle = pow(max(dot(normal, halfVector), 0.0), 130.0);
    vec3 sunColor = vec3(1.0, 0.92, 0.72);
    color += sunColor * sparkle * 0.85;

    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    color = mix(color, vec3(0.72, 0.86, 0.88), fresnel * 0.28);

    float foam = smoothstep(0.3, 0.42, vWave);
    color = mix(color, vec3(0.86, 0.94, 0.93), foam * 0.35);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Sea() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCameraPosition: { value: new THREE.Vector3() },
    }),
    [],
  );
  const { camera } = useThree();

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.elapsedTime;
      material.current.uniforms.uCameraPosition.value.copy(camera.position);
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
