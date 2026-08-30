import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useEffect, useState } from "react";
import * as THREE from "three";
import { OdysseyScene } from "./game/OdysseyScene";
import type { CaveStage, GameMode } from "./game/types";
import { useKeyboard } from "./game/useKeyboard";
import { Hud } from "./ui/Hud";

export function App() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<GameMode>("sailing");
  const [nearPortal, setNearPortal] = useState(false);
  const [stage, setStage] = useState<CaveStage>("name");
  const [message, setMessage] = useState("");
  const keys = useKeyboard();

  const enterCave = useCallback(() => {
    if (started && nearPortal && mode === "sailing") {
      setMessage("");
      setMode("entering");
    }
  }, [mode, nearPortal, started]);

  const exitCave = useCallback(() => {
    if (mode === "cave" && stage === "complete") {
      setMode("exiting");
    }
  }, [mode, stage]);

  useEffect(() => {
    const onInteraction = (event: KeyboardEvent) => {
      if (event.code !== "KeyE" || event.repeat) return;

      if (mode === "sailing") {
        enterCave();
      } else if (mode === "cave" && stage === "complete") {
        exitCave();
      }
    };

    window.addEventListener("keydown", onInteraction);
    return () => window.removeEventListener("keydown", onInteraction);
  }, [enterCave, exitCave, mode, stage]);

  const chooseName = (name: string) => {
    if (name === "Ninguém") {
      setStage("wine");
      setMessage("Polifemo ri. O nome parece inofensivo.");
      return;
    }

    setMessage("Esse nome entregaria sua identidade. Tente outra artimanha.");
  };

  return (
    <main className="experience">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 11.5, 22.5], fov: 42, near: 0.1, far: 180 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <OdysseyScene
            started={started}
            mode={mode}
            stage={stage}
            keys={keys}
            onProximityChange={setNearPortal}
            onModeChange={setMode}
            onWine={() => {
              if (stage === "wine") {
                setStage("stake");
                setMessage("O vinho derruba até mesmo a força de um Ciclope.");
              }
            }}
            onStake={() => {
              if (stage === "stake") {
                setStage("escape");
                setMessage("Polifemo grita por ajuda: “Ninguém me feriu!”");
              }
            }}
            onEscape={() => {
              if (stage === "escape") {
                setStage("complete");
                setMessage("Lembrança de Polifemo recuperada.");
              }
            }}
          />
        </Suspense>
      </Canvas>

      <Hud
        started={started}
        mode={mode}
        nearPortal={nearPortal}
        stage={stage}
        message={message}
        onStart={() => setStarted(true)}
        onEnter={enterCave}
        onExit={exitCave}
        onChooseName={chooseName}
      />
    </main>
  );
}
