import { useCallback, useRef } from "react";

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttling = useRef<boolean>(false);

  const throttledCallback = useCallback((...args: any[]) => {
    if (!throttling.current) {
      callback(...args);
      throttling.current = true;
      setTimeout(() => {
        throttling.current = false;
      }, delay);
    }
  }, [callback, delay]);

  return throttledCallback;
}
