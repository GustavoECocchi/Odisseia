import { MeshPortalMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { CaveEncounter } from "./CaveEncounter";
import type { CaveStage, GameMode } from "./types";

const ENTRY_CAMERA = new THREE.Vector3(0, 2.6, -10.8);
const CAVE_CAMERA = new THREE.Vector3(0, 2.35, -16.3);
const ENTRY_TARGET = new THREE.Vector3(0, 2.1, -18.5);
const CAVE_TARGET = new THREE.Vector3(0, 2.2, -24);

type PortalGateProps = {
  mode: GameMode;
  stage: CaveStage;
  onModeChange: (mode: GameMode) => void;
  onWine: () => void;
  onStake: () => void;
  onEscape: () => void;
};

export function PortalGate({
  mode,
  stage,
  onModeChange,
  onWine,
  onStake,
  onEscape,
}: PortalGateProps) {
  const portal = useRef<any>(null);
  const transitionCommitted = useRef(false);
  const transitionProgress = useRef(0);
  const transitionStartedAt = useRef(0);
  const previousMode = useRef<GameMode>(mode);
  const { camera } = useThree();

  useFrame(({ clock }, delta) => {
    if (!portal.current) return;
    const dt = Math.min(delta, 0.05);

    if (previousMode.current !== mode) {
      previousMode.current = mode;
      transitionStartedAt.current = clock.elapsedTime;
      transitionCommitted.current = false;
    }

    if (mode === "sailing") {
      transitionProgress.current = 0;
      portal.current.blend = 0;
      return;
    }

    if (mode === "entering") {
      camera.position.lerp(ENTRY_CAMERA, 1 - Math.exp(-2.2 * dt));
      camera.lookAt(ENTRY_TARGET);
      transitionProgress.current = Math.min(
        1,
        (clock.elapsedTime - transitionStartedAt.current) / 1.45,
      );
      portal.current.blend = THREE.MathUtils.smoothstep(
        transitionProgress.current,
        0,
        1,
      );

      if (
        transitionProgress.current >= 1 &&
        !transitionCommitted.current
      ) {
        transitionCommitted.current = true;
        onModeChange("cave");
      }
      return;
    }

    if (mode === "cave") {
      portal.current.blend = 1;
      camera.position.lerp(CAVE_CAMERA, 1 - Math.exp(-2.4 * dt));
      camera.lookAt(CAVE_TARGET);
      transitionCommitted.current = false;
      return;
    }

    camera.position.lerp(ENTRY_CAMERA, 1 - Math.exp(-2.8 * dt));
    camera.lookAt(ENTRY_TARGET);
    transitionProgress.current = Math.max(
      0,
      1 - (clock.elapsedTime - transitionStartedAt.current) / 1.3,
    );
    portal.current.blend = THREE.MathUtils.smoothstep(
      transitionProgress.current,
      0,
      1,
    );

    if (
      transitionProgress.current <= 0 &&
      !transitionCommitted.current
    ) {
      transitionCommitted.current = true;
      onModeChange("sailing");
    }
  });

  return (
    <mesh position={[0, 1.72, -15.7]}>
      <circleGeometry args={[1.82, 48]} />
      <MeshPortalMaterial
        ref={portal}
        blend={0}
        blur={0.08}
        resolution={512}
        events={mode === "cave"}
        worldUnits
        side={THREE.DoubleSide}
      >
        <CaveEncounter
          stage={stage}
          onWine={onWine}
          onStake={onStake}
          onEscape={onEscape}
        />
      </MeshPortalMaterial>
    </mesh>
  );
}
