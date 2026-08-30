import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { GameMode } from "./types";

const ISLAND_CENTER = new THREE.Vector2(0, -20);
const FOLLOW_OFFSET = new THREE.Vector3();
const CAMERA_TARGET = new THREE.Vector3();
const LOOK_AHEAD = new THREE.Vector3();
const UP_AXIS = new THREE.Vector3(0, 1, 0);

type BoatProps = {
  active: boolean;
  mode: GameMode;
  keys: React.RefObject<Set<string>>;
  onProximityChange: (near: boolean) => void;
};

export function Boat({
  active,
  mode,
  keys,
  onProximityChange,
}: BoatProps) {
  const motion = useRef<THREE.Group>(null);
  const model = useRef<THREE.Group>(null);
  const speed = useRef(0);
  const heading = useRef(0);
  const wasNear = useRef(false);
  const { camera } = useThree();

  useFrame(({ clock }, delta) => {
    if (!motion.current || !model.current) return;

    const dt = Math.min(delta, 0.05);
    const isSailing = active && mode === "sailing";
    const pressed = keys.current;

    if (isSailing) {
      const throttle =
        (pressed.has("KeyW") || pressed.has("ArrowUp") ? 1 : 0) -
        (pressed.has("KeyS") || pressed.has("ArrowDown") ? 1 : 0);
      const steering =
        (pressed.has("KeyA") || pressed.has("ArrowLeft") ? 1 : 0) -
        (pressed.has("KeyD") || pressed.has("ArrowRight") ? 1 : 0);

      if (throttle !== 0) {
        speed.current += throttle * 4.1 * dt;
      } else {
        speed.current *= Math.exp(-1.55 * dt);
      }

      speed.current = THREE.MathUtils.clamp(speed.current, -2.1, 5.4);

      const steeringGrip =
        0.35 + Math.min(Math.abs(speed.current) / 3.2, 1) * 0.65;
      const reverseDirection = speed.current < -0.05 ? -1 : 1;
      heading.current +=
        steering * 1.28 * steeringGrip * reverseDirection * dt;

      const forward = new THREE.Vector3(
        Math.sin(heading.current),
        0,
        -Math.cos(heading.current),
      );
      const previous = motion.current.position.clone();
      motion.current.position.addScaledVector(forward, speed.current * dt);

      motion.current.position.x = THREE.MathUtils.clamp(
        motion.current.position.x,
        -32,
        32,
      );
      motion.current.position.z = THREE.MathUtils.clamp(
        motion.current.position.z,
        -42,
        26,
      );

      const islandDistance = Math.hypot(
        motion.current.position.x - ISLAND_CENTER.x,
        motion.current.position.z - ISLAND_CENTER.y,
      );

      if (islandDistance < 7.2) {
        motion.current.position.copy(previous);
        speed.current *= -0.18;
      }

      const near = islandDistance < 20.5;
      if (near !== wasNear.current) {
        wasNear.current = near;
        onProximityChange(near);
      }
    } else {
      speed.current *= Math.exp(-3.4 * dt);
    }

    motion.current.rotation.y = heading.current;
    model.current.position.y =
      Math.sin(clock.elapsedTime * 1.7) * 0.09 +
      Math.sin(clock.elapsedTime * 0.7) * 0.04;
    model.current.rotation.z =
      Math.sin(clock.elapsedTime * 1.35) * 0.035 -
      THREE.MathUtils.clamp(speed.current * 0.008, -0.035, 0.035);
    model.current.rotation.x = Math.sin(clock.elapsedTime * 1.1) * 0.018;

    if (mode === "sailing") {
      FOLLOW_OFFSET.set(6.5, 11.5, 13.5).applyAxisAngle(UP_AXIS, heading.current);
      FOLLOW_OFFSET.add(motion.current.position);
      camera.position.lerp(FOLLOW_OFFSET, 1 - Math.exp(-2.8 * dt));

      CAMERA_TARGET.copy(motion.current.position);
      LOOK_AHEAD.set(0, 0, -4.2).applyAxisAngle(UP_AXIS, heading.current);
      CAMERA_TARGET.add(LOOK_AHEAD);
      CAMERA_TARGET.y += 0.35;
      camera.lookAt(CAMERA_TARGET);
    }
  });

  return (
    <group ref={motion} position={[0, 0, 9]}>
      <group ref={model}>
        <mesh castShadow position-y={0.15} scale={[1.05, 0.45, 2.05]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#7d3f25"
            roughness={0.88}
            flatShading
          />
        </mesh>
        <mesh castShadow position={[0, 0.63, 0.18]}>
          <boxGeometry args={[1.35, 0.18, 2.5]} />
          <meshStandardMaterial color="#c98b4c" roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0, 1.35, 0.1]}>
          <cylinderGeometry args={[0.055, 0.075, 2.7, 6]} />
          <meshStandardMaterial color="#4a291c" roughness={1} />
        </mesh>
        <mesh castShadow position={[0.04, 1.65, 0.08]}>
          <planeGeometry args={[1.65, 1.75]} />
          <meshStandardMaterial
            color="#e8d7ad"
            roughness={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh castShadow position={[0, 0.72, -1.5]} rotation-x={Math.PI / 2}>
          <coneGeometry args={[0.16, 0.75, 6]} />
          <meshStandardMaterial color="#c98b4c" flatShading />
        </mesh>
      </group>
    </group>
  );
}
