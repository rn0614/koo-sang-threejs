import { useRef } from "react";

export function useThrottle(callback: (...args: any[]) => any, delay = 1000) {
  const lastRun = useRef(Date.now());

  return () => {
    const timeElapsed = Date.now() - lastRun.current;

    if (timeElapsed >= delay) {
      callback();
      lastRun.current = Date.now();
    }
  };
}
