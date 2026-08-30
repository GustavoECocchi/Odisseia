import { useEffect, useRef } from "react";

const GAME_KEYS = new Set([
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "Space",
  "KeyE",
]);

export function useKeyboard() {
  const pressed = useRef(new Set<string>());

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (GAME_KEYS.has(event.code)) {
        event.preventDefault();
        pressed.current.add(event.code);
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      pressed.current.delete(event.code);
    };

    const onBlur = () => pressed.current.clear();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return pressed;
}
