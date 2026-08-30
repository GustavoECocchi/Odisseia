import { Environment, Sky } from "@react-three/drei";
import type { RefObject } from "react";
import { Boat } from "./Boat";
import { PolyphemusIsland } from "./PolyphemusIsland";
import { PortalGate } from "./PortalGate";
import { Sea } from "./Sea";
import type { CaveStage, GameMode } from "./types";

type OdysseySceneProps = {
  started: boolean;
  mode: GameMode;
  stage: CaveStage;
  keys: RefObject<Set<string>>;
  onProximityChange: (near: boolean) => void;
  onModeChange: (mode: GameMode) => void;
  onWine: () => void;
  onStake: () => void;
  onEscape: () => void;
};

export function OdysseyScene({
  started,
  mode,
  stage,
  keys,
  onProximityChange,
  onModeChange,
  onWine,
  onStake,
  onEscape,
}: OdysseySceneProps) {
  return (
    <>
      <color attach="background" args={["#8fc8cf"]} />
      <fog attach="fog" args={["#78b7c0", 28, 82]} />
      <ambientLight intensity={1.25} color="#bcd5d2" />
      <directionalLight
        position={[-12, 18, 9]}
        intensity={2.6}
        color="#ffe3a8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
      />
      <Sky
        distance={450000}
        sunPosition={[-4, 3, 5]}
        inclination={0.51}
        azimuth={0.19}
        turbidity={7}
        rayleigh={1.8}
      />
      <Environment preset="sunset" environmentIntensity={0.22} />

      <Sea />
      <PolyphemusIsland />
      <PortalGate
        mode={mode}
        stage={stage}
        onModeChange={onModeChange}
        onWine={onWine}
        onStake={onStake}
        onEscape={onEscape}
      />
      <Boat
        active={started}
        mode={mode}
        keys={keys}
        onProximityChange={onProximityChange}
      />
    </>
  );
}
