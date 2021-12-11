export interface ICursor {
  stickyPos: IStickyPos;
  cursorSize?: number;
}

export interface IStickyPos {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  isSticky: boolean;
}

export interface ISetUpBlobOption {
  pts: number;
  centerX?: number;
  centerY?: number;
  minRadius: number;
  maxRadius?: number;
  minDuration?: number;
  maxDuration?: number;
}
