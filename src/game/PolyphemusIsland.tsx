import { Float } from "@react-three/drei";
import { useMemo } from "react";

const ROCKS: Array<{
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}> = [
  { position: [-3.8, 0.3, -20], scale: [3.2, 2.1, 3.4], color: "#605349" },
  { position: [3.4, 0.45, -20.6], scale: [3.1, 2.4, 3.2], color: "#66584d" },
  { position: [0, 0, -23.5], scale: [5.2, 2.1, 4.8], color: "#746355" },
  { position: [-2.4, 2.2, -21.7], scale: [2.4, 2.6, 2.4], color: "#5b5048" },
  { position: [2.3, 2.5, -22.2], scale: [2.2, 2.8, 2.3], color: "#62564d" },
  { position: [0, 4.2, -22.4], scale: [2.7, 2.2, 2.5], color: "#574d46" },
];

const ARCH_ROCKS: Array<{
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}> = [
  {
    position: [-2.05, 1.05, -15.45],
    scale: [0.95, 1.65, 1.05],
    rotation: [0.1, 0.2, -0.18],
  },
  {
    position: [2.05, 1.05, -15.45],
    scale: [0.95, 1.65, 1.05],
    rotation: [-0.08, -0.25, 0.2],
  },
  {
    position: [-1.15, 3.05, -15.55],
    scale: [1.35, 0.95, 1.1],
    rotation: [0.1, 0.05, 0.35],
  },
  {
    position: [1.15, 3.05, -15.55],
    scale: [1.35, 0.95, 1.1],
    rotation: [-0.1, -0.05, -0.35],
  },
];

export function PolyphemusIsland() {
  const shrubs = useMemo(
    () =>
      Array.from({ length: 13 }, (_, index) => {
        const angle = (index / 13) * Math.PI * 2;
        const radius = 3.1 + (index % 3) * 0.7;
        return {
          position: [
            Math.cos(angle) * radius,
            2.1 + (index % 2) * 0.35,
            -21.2 + Math.sin(angle) * radius * 0.58,
          ] as [number, number, number],
          scale: 0.28 + (index % 4) * 0.06,
        };
      }),
    [],
  );

  return (
    <group>
      {ROCKS.map((rock, index) => (
        <mesh
          key={index}
          castShadow
          receiveShadow
          position={rock.position}
          scale={rock.scale}
          rotation={[
            index * 0.2,
            index * 0.47,
            index % 2 === 0 ? 0.12 : -0.1,
          ]}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={rock.color}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {ARCH_ROCKS.map((rock, index) => (
        <mesh
          key={`arch-${index}`}
          castShadow
          position={rock.position}
          scale={rock.scale}
          rotation={rock.rotation}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4e443e" roughness={1} flatShading />
        </mesh>
      ))}

      {shrubs.map((shrub, index) => (
        <mesh
          key={`shrub-${index}`}
          castShadow
          position={shrub.position}
          scale={shrub.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#6d773f" : "#899253"}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh position={[0, 7.2, -22]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshBasicMaterial color="#d7b16c" />
        </mesh>
      </Float>
    </group>
  );
}
