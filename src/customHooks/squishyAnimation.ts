import React, { useCallback, useLayoutEffect } from "react";
import gsap from "gsap-trial";

import { getScale, getAngle } from "../helpers";
import { useInstance } from "./gsapHooks";

export function useSquishyEffect(el: React.RefObject<HTMLElement>) {
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance({});

  useLayoutEffect(() => {
    set.x = gsap.quickSetter(el.current, "x", "px");
    set.y = gsap.quickSetter(el.current, "y", "px");
    set.r = gsap.quickSetter(el.current, "rotate", "deg");
    set.sx = gsap.quickSetter(el.current, "scaleX");
    set.sy = gsap.quickSetter(el.current, "scaleY");
    set.width = gsap.quickSetter(el.current, "width", "px");
  }, []);

  const AnimateSquishyLoop = useCallback((cursorSize: number = 80) => {
    // Calculate angle and scale based on velocity
    var rotation = getAngle(vel.x, vel.y); // Mouse Move Angle
    var scale = getScale(vel.x, vel.y); // Blob Squeeze Amount
    if (set && set.hasOwnProperty("x")) {
      set.x(pos.x);
      set.y(pos.y);
      set.width(cursorSize + scale * 150);
      set.r(rotation);
      set.sx(1 + scale);
      set.sy(1 - scale);
    }
  }, []);

  const setFromEvent = useCallback(({ x, y }) => {
    gsap.to(pos, {
      x,
      y,
      duration: 1,
      ease: "expo.easeOut",
      onUpdate: () => {
        vel.x = x - pos.x;
        vel.y = y - pos.y;
      }
    });
  }, []);

  return { AnimateSquishyLoop, setFromEvent };
}
