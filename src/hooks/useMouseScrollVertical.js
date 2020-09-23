import React from "react";
import { clearInterval, setInterval } from "timers";

export default function useMouseScrollVertical(condition) {
  const scrollRef = React.useRef(null);
  const intervalRef = React.useRef(null);
  const mouseCoordRef = React.useRef({ x: 0, y: 0 });

  const edgeSize = 100;
  const maxStep = 20;

  const saveMouseCoord = React.useCallback((event) => {
    mouseCoordRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  }, []);

  const checkMoveScroll = React.useCallback(() => {
    const element = scrollRef.current;
    const rect = element.getBoundingClientRect();
    const topEdge = edgeSize + rect.y;
    const bottomEdge = rect.y + rect.height - edgeSize;

    const inBottomEdge = mouseCoordRef.current.y >= bottomEdge;
    const inTopEdge = mouseCoordRef.current.y <= topEdge;

    const canScrollUp = element.scrollTop > 0;
    const canScrollDown =
      element.scrollTop < element.scrollHeight - rect.height;

    if ((!inBottomEdge || !canScrollDown) && (!inTopEdge || !canScrollUp)) {
      return false;
    }

    let nextScroll = element.scrollTop;

    if (canScrollDown && inBottomEdge) {
      const intensity = (mouseCoordRef.current.y - bottomEdge) / edgeSize;
      nextScroll = nextScroll + Math.min(maxStep * intensity, maxStep);
    } else if (canScrollUp && inTopEdge) {
      const intensity = (topEdge - mouseCoordRef.current.y) / edgeSize;
      nextScroll = nextScroll - Math.min(maxStep * intensity, maxStep);
    }

    if (nextScroll !== element.scrollTop) {
      element.scrollTo({
        top: nextScroll,
      });
    }
  }, []);

  React.useLayoutEffect(() => {
    if (condition) {
      intervalRef.current = setInterval(checkMoveScroll, 30);
      window.addEventListener("mousemove", saveMouseCoord);
    } else {
      window.removeEventListener("mousemove", saveMouseCoord);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      window.removeEventListener("mousemove", saveMouseCoord);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [saveMouseCoord, checkMoveScroll, condition]);

  const scrolDown = React.useCallback(() => {
    const element = scrollRef.current;
    element.scrollTo({
      top: element.scrollHeight,
    });
  }, []);

  return { scrollRef, scrolDown };
}
