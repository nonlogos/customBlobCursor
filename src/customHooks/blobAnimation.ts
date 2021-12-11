import { useCallback, useRef } from "react";
import gsap from "gsap-trial";

import { cardinal, random } from "../helpers";

export interface IUseBlob {
  numPoints: number;
  minDuration: number;
  maxDuration: number;
  minRadius: number;
  maxRadius: number;
  centerX: number;
  centerY: number;
}

const defaultBlobOptions = {
  numPoints: 6,
  centerX: 100,
  centerY: 100,
  minRadius: 55,
  maxRadius: 75,
  minDuration: 2,
  maxDuration: 3
};

/**
 *
 * blob animation utility helper functions
 */

function setBlobAnim(options: IUseBlob) {
  const {
    numPoints = 6,
    minDuration,
    maxDuration,
    minRadius,
    maxRadius,
    centerX,
    centerY
  } = options;

  const baseCir = Math.PI * 2;
  // used to equally space each point around the circle
  const slice = baseCir / numPoints;
  const startAngle = random(baseCir) || baseCir;

  const points = [...Array(numPoints)].map((_, i) => {
    const angle = startAngle + i * slice;
    const duration = random(minDuration, maxDuration) || minDuration;
    const pt = {
      x: centerX + Math.cos(angle) * minRadius,
      y: centerY + Math.sin(angle) * minRadius
    };
    gsap.to(pt, duration, {
      x: centerX + Math.cos(angle) * maxRadius,
      y: centerY + Math.sin(angle) * maxRadius,
      repeat: -1,
      yoyo: true,
      ease: "sine.easeInOut"
    });
    return pt;
  });

  return points;
}

/**
 * useSVGPath
 * @param svgPathElem
 * @param points
 */
function useSVGPath(
  svgPathElem: React.RefObject<SVGPathElement>,
  points: { x: number; y: number }[]
) {
  const setSvgPath = useCallback(() => {
    if (!svgPathElem || !svgPathElem.current) {
      return;
    }
    svgPathElem.current.setAttribute("d", cardinal(points, true, 1));
  }, [svgPathElem]);

  return setSvgPath;
}

export function useBlobAsCircle(
  svgPathElem: React.RefObject<SVGPathElement>,
  numPoints: number,
  radius: number
) {
  const baseCir = Math.PI * 2;
  // used to equally space each point around the circle
  const slice = baseCir / numPoints;
  const startAngle = random(baseCir) || baseCir;
  const points = [...Array(numPoints)].map((_, i) => {
    const angle = startAngle + i * slice;
    return {
      x: 100 + Math.cos(angle) * radius,
      y: 100 + Math.sin(angle) * radius
    };
  });
  const pointsRef = useRef(points);
  const setSvgPath = useSVGPath(svgPathElem, pointsRef.current);

  return setSvgPath;
}

// takes svgPathElem, options: IUseBlob
// returns useCallback method to set dPath animation/frame on svgPath element
export function useBlob(
  svgPathElem: React.RefObject<SVGPathElement>,
  options = defaultBlobOptions
) {
  const points = useRef(setBlobAnim(options));
  const setSvgPath = useSVGPath(svgPathElem, points.current);
  return setSvgPath;
}
