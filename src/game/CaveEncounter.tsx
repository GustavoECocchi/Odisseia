import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { CaveStage } from "./types";

type CaveEncounterProps = {
  stage: CaveStage;
  onWine: () => void;
  onStake: () => void;
  onEscape: () => void;
};

function Highlight({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) {
  const material = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (material.current && active) {
      material.current.emissiveIntensity =
        0.6 + Math.sin(clock.elapsedTime * 3.2) * 0.22;
    }
  });

  return (
    <meshStandardMaterial
      ref={material}
      color={color}
      emissive={active ? color : "#000000"}
      emissiveIntensity={active ? 0.7 : 0}
      roughness={0.8}
      flatShading
    />
  );
}

function Sheep({
  position,
  active = false,
  onClick,
}: {
  position: [number, number, number];
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
      onPointerEnter={() => {
        if (active) document.body.classList.add("is-pointing");
      }}
      onPointerLeave={() => document.body.classList.remove("is-pointing")}
    >
      <mesh castShadow>
        <dodecahedronGeometry args={[0.72, 0]} />
        <Highlight active={active} color="#e9dfc5" />
      </mesh>
      <mesh castShadow position={[0, 0.15, -0.65]}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#746151" roughness={1} flatShading />
      </mesh>
      {[-0.35, 0.35].map((x) =>
        [-0.28, 0.28].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.62, z]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 0.6, 5]} />
            <meshStandardMaterial color="#5b483b" roughness={1} />
          </mesh>
        )),
      )}
    </group>
  );
}

export function CaveEncounter({
  stage,
  onWine,
  onStake,
  onEscape,
}: CaveEncounterProps) {
  const wineActive = stage === "wine";
  const stakeActive = stage === "stake";
  const sheepActive = stage === "escape";
  const eyeClosed = stage === "escape" || stage === "complete";

  return (
    <>
      <color attach="background" args={["#120d12"]} />
      <fog attach="fog" args={["#120d12", 8, 30]} />
      <ambientLight intensity={0.35} color="#876f73" />
      <pointLight
        position={[0, 1.5, -20]}
        intensity={42}
        distance={16}
        color="#ff8a3c"
        castShadow
      />

      <mesh
        position={[0, -0.55, -22]}
        rotation-x={-Math.PI / 2}
        receiveShadow
      >
        <circleGeometry args={[13, 32]} />
        <meshStandardMaterial color="#282020" roughness={1} flatShading />
      </mesh>

      {[
        [-8, 3, -25],
        [8, 3, -25],
        [-6, 5, -31],
        [6, 5, -31],
        [0, 8, -30],
      ].map((position, index) => (
        <mesh
          key={`wall-${index}`}
          position={position as [number, number, number]}
          scale={[5, 5, 5]}
          rotation={[index * 0.24, index * 0.36, index * 0.12]}
          receiveShadow
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={index % 2 ? "#35292a" : "#2b2428"}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      <group position={[0, 3.5, -27.3]}>
        <mesh castShadow scale={[2.3, 2.5, 1.8]}>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#9a6d52" roughness={0.95} flatShading />
        </mesh>
        <mesh position={[0, 0.35, 1.62]} scale={[0.62, 0.38, 0.2]}>
          <sphereGeometry args={[1, 16, 8]} />
          <meshStandardMaterial
            color={eyeClosed ? "#3b2520" : "#e2be78"}
            emissive={eyeClosed ? "#170a07" : "#7b3c12"}
            emissiveIntensity={eyeClosed ? 0.1 : 0.45}
            roughness={0.7}
          />
        </mesh>
        {!eyeClosed && (
          <mesh position={[0, 0.35, 1.82]} scale={[0.15, 0.26, 0.08]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshBasicMaterial color="#17100e" />
          </mesh>
        )}
        <mesh position={[0, -0.58, 1.62]} scale={[0.62, 0.1, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#40241f" />
        </mesh>
      </group>

      <group
        position={[-2.25, 0.15, -21.25]}
        onClick={(event) => {
          event.stopPropagation();
          if (wineActive) onWine();
        }}
        onPointerEnter={() => {
          if (wineActive) document.body.classList.add("is-pointing");
        }}
        onPointerLeave={() => document.body.classList.remove("is-pointing")}
      >
        <mesh castShadow position-y={0.55}>
          <cylinderGeometry args={[0.42, 0.55, 1.1, 9]} />
          <Highlight active={wineActive} color="#a54d2d" />
        </mesh>
        <mesh castShadow position-y={1.15}>
          <cylinderGeometry args={[0.2, 0.32, 0.32, 9]} />
          <Highlight active={wineActive} color="#a54d2d" />
        </mesh>
      </group>

      <group
        position={[2.1, 0.34, -21]}
        rotation-z={-0.12}
        onClick={(event) => {
          event.stopPropagation();
          if (stakeActive) onStake();
        }}
        onPointerEnter={() => {
          if (stakeActive) document.body.classList.add("is-pointing");
        }}
        onPointerLeave={() => document.body.classList.remove("is-pointing")}
      >
        <mesh castShadow rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.12, 0.2, 2.7, 6]} />
          <Highlight active={stakeActive} color="#87502e" />
        </mesh>
        <mesh position={[-1.44, 0, 0]} rotation-z={-Math.PI / 2}>
          <coneGeometry args={[0.2, 0.5, 6]} />
          <Highlight active={stakeActive} color="#87502e" />
        </mesh>
      </group>

      <Sheep position={[-3.5, 0.25, -23.2]} />
      <Sheep position={[3.3, 0.25, -23.7]} />
      <Sheep
        position={[0.15, 0.25, -22.6]}
        active={sheepActive}
        onClick={sheepActive ? onEscape : undefined}
      />

      <group position={[0, 0.12, -19.7]}>
        {[0, 1, 2, 3, 4].map((index) => {
          const angle = (index / 5) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[
                Math.cos(angle) * 0.48,
                0,
                Math.sin(angle) * 0.48,
              ]}
              scale={[0.42, 0.16, 0.26]}
            >
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#55433a" roughness={1} />
            </mesh>
          );
        })}
        <mesh position-y={0.43}>
          <coneGeometry args={[0.42, 1.1, 7]} />
          <meshBasicMaterial color="#f67a32" transparent opacity={0.82} />
        </mesh>
        <mesh position-y={0.62} scale={0.62}>
          <coneGeometry args={[0.35, 0.9, 7]} />
          <meshBasicMaterial color="#ffd275" transparent opacity={0.78} />
        </mesh>
      </group>
    </>
  );
}
