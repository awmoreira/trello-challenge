import React from "react";

export default function useKeyMouseToSaveClose(
  save,
  close
) {
  const containerRef = React.useRef(null);
  const pauseRef = React.useRef(false);

  React.useLayoutEffect(() => {
    function handleKeyDown(ev) {
      switch (ev.key) {
        case "Enter":
          save();
          break;
        case "Escape":
          close();
          break;
        default:
          break;
      }
    }

    function mouseUpHandler(ev) {
      if (pauseRef.current) return;
      const rect = (containerRef.current).getBoundingClientRect();

      if (
        ev.clientX < rect.x ||
        ev.clientX > rect.x + rect.width ||
        ev.clientY < rect.y ||
        ev.clientY > rect.y + rect.height
      ) {
        save();
        close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", mouseUpHandler, true);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", mouseUpHandler, true);
    };
  }, [save, close]);

  return { containerRef, pauseRef };
}
