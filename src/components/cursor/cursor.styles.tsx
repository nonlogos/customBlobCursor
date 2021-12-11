import styled from "styled-components";

export interface IStyledCursor {
  size?: number;
}

export const StyledCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ size }: IStyledCursor) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
  pointer-events: none;
  & svg {
    transform-origin: center;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
`;
