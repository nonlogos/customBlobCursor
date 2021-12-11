export function random(min: number, max?: number) {
  try {
    if (min === undefined || typeof min !== "number") {
      throw new Error("missing a valid min argument. Needs to be a number");
    }
    if (max && typeof max !== "number") {
      throw new Error("the max argument needs to be a number");
    }
    const minVal = max === undefined ? 0 : Math.min(min, max);
    const maxVal = max === undefined ? min : Math.max(min, max);

    return minVal + (maxVal - minVal) * Math.random();
  } catch (e) {
    console.error(e);
  }
}

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
export function cardinal(
  data: { x: number; y: number; duration?: number }[],
  closed: boolean,
  tension: number
) {
  if (data.length < 1) return "M0 0";
  if (tension == null) tension = 1;

  let size = data.length - (closed ? 0 : 1);
  let path = "M" + data[0].x + " " + data[0].y + " C";

  for (let i = 0; i < size; i++) {
    let p0, p1, p2, p3;

    if (closed) {
      p0 = data[(i - 1 + size) % size];
      p1 = data[i];
      p2 = data[(i + 1) % size];
      p3 = data[(i + 2) % size];
    } else {
      p0 = i === 0 ? data[0] : data[i - 1];
      p1 = data[i];
      p2 = data[i + 1];
      p3 = i === size - 1 ? p2 : data[i + 2];
    }

    let x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
    let y1 = p1.y + ((p2.y - p0.y) / 6) * tension;

    let x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
    let y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

    path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
  }
  return closed ? path + "z" : path;
}

// function for Mouse move scale change
export function getScale(diffX: number, diffY: number) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.sqrt(Math.pow(diffY, 2))
  );
  return Math.min(distance / 735, 0.15);
}

// function for Mouse movement angle in degrees
// (... * 180 / Math.PI) turns radian to degree
export function getAngle(diffX: number, diffY: number) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}
