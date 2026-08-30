import type { CaveStage, GameMode } from "../game/types";

const STAGE_COPY: Record<CaveStage, { eyebrow: string; text: string }> = {
  name: {
    eyebrow: "O CICLOPE PERGUNTA",
    text: "Estrangeiro, diga-me: qual é o seu nome?",
  },
  wine: {
    eyebrow: "A PRIMEIRA ARTIMANHA",
    text: "Encontre o vinho forte e ofereça-o a Polifemo.",
  },
  stake: {
    eyebrow: "O GIGANTE ADORMECE",
    text: "Prepare a estaca enquanto o vinho faz efeito.",
  },
  escape: {
    eyebrow: "NINGUÉM O FERIU",
    text: "Esconda-se sob a ovelha para deixar a caverna.",
  },
  complete: {
    eyebrow: "LEMBRANÇA CONQUISTADA",
    text: "A astúcia abriu um caminho onde a força falharia.",
  },
};

type HudProps = {
  started: boolean;
  mode: GameMode;
  nearPortal: boolean;
  stage: CaveStage;
  message: string;
  onStart: () => void;
  onEnter: () => void;
  onExit: () => void;
  onChooseName: (name: string) => void;
};

export function Hud({
  started,
  mode,
  nearPortal,
  stage,
  message,
  onStart,
  onEnter,
  onExit,
  onChooseName,
}: HudProps) {
  const transitioning = mode === "entering" || mode === "exiting";

  return (
    <div className="ui-layer">
      {!started && (
        <section className="intro-card" aria-labelledby="game-title">
          <p className="kicker">UMA JORNADA INTERATIVA</p>
          <h1 id="game-title">
            O trajeto
            <span>de Odisseu</span>
          </h1>
          <p className="intro-copy">
            Atravesse o Mediterrâneo mítico. Em cada ilha, sobreviver
            dependerá menos da força do que da sua astúcia.
          </p>
          <button className="primary-button" onClick={onStart}>
            Iniciar jornada
          </button>
          <div className="control-preview">
            <span>
              <kbd>WASD</kbd> ou <kbd>↑↓←→</kbd> navegar
            </span>
            <span>
              <kbd>E</kbd> interagir
            </span>
          </div>
        </section>
      )}

      {started && (
        <>
          <header className="topbar">
            <div>
              <p className="topbar-label">ATO I</p>
              <p className="topbar-title">A partida e a astúcia</p>
            </div>
            <div className="memory-counter" aria-label="Lembranças conquistadas">
              <span className={stage === "complete" ? "memory is-lit" : "memory"} />
              <span>Polifemo</span>
            </div>
          </header>

          {mode === "sailing" && (
            <div className="sailing-hint">
              <span>WASD</span>
              <i />
              <span>SETAS</span>
              <small>navegar</small>
            </div>
          )}

          {nearPortal && mode === "sailing" && (
            <button className="interaction-prompt" onClick={onEnter}>
              <kbd>E</kbd>
              <span>
                <small>ILHA DE POLIFEMO</small>
                Entrar na caverna
              </span>
            </button>
          )}

          {mode === "cave" && (
            <section className="encounter-panel">
              <p className="kicker">{STAGE_COPY[stage].eyebrow}</p>
              <h2>{STAGE_COPY[stage].text}</h2>

              {stage === "name" && (
                <div className="choice-list">
                  <button onClick={() => onChooseName("Odisseu")}>
                    Odisseu
                  </button>
                  <button onClick={() => onChooseName("Ninguém")}>
                    Ninguém
                  </button>
                  <button onClick={() => onChooseName("Laertes")}>
                    Filho de Laertes
                  </button>
                </div>
              )}

              {stage !== "name" && stage !== "complete" && (
                <p className="encounter-help">
                  Clique no objeto iluminado para agir.
                </p>
              )}

              {stage === "complete" && (
                <button className="primary-button compact" onClick={onExit}>
                  <kbd>E</kbd> Retornar ao barco
                </button>
              )}

              {message && <p className="feedback-message">{message}</p>}
            </section>
          )}

          {transitioning && (
            <div className="transition-label" aria-live="polite">
              {mode === "entering"
                ? "Entrando na caverna…"
                : "Retornando ao mar…"}
            </div>
          )}
        </>
      )}
    </div>
  );
}
