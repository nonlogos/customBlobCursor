import gsap from "gsap-trial";
import { useLayoutEffect, useRef } from "react";

export function useTicker(callback, paused: boolean = false) {
  useLayoutEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => gsap.ticker.remove(callback);
  }, [callback, paused]);
}

export function useInstance(value: any) {
  const ref = useRef<any>(null);
  ref.current = typeof value === "function" ? value() : value;

  return ref.current;
}
