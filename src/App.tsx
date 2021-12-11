// Reference
// https://codepen.io/blitzve0/pen/vYJGPaa?editors=0110 - squishing cursor
// https://georgefrancis.dev/writing/build-a-smooth-animated-blob-with-svg-and-js/ - blob

import { useState, MouseEvent } from "react";

import { GlobalStyles, StyledNav } from "./styles";
import Cursor from "./components/cursor/Cursor.component";

const defaultSticyPos = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  isSticky: false
};
const links = ["Home", "About", "Gallery", "Contact"];

export default function App() {
  const [stickyPos, setStickyPos] = useState(() => defaultSticyPos);
  const handleMouseEnter = (e: MouseEvent) => {
    e.preventDefault();
    const navItem = e.currentTarget;
    const { left, top, width, height } = navItem.getBoundingClientRect();
    setStickyPos((prev) => ({ left, top, width, height, isSticky: true }));
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.preventDefault();
    setStickyPos((prev) => defaultSticyPos);
  };
  return (
    <>
      <GlobalStyles />
      <Cursor stickyPos={{ ...stickyPos }} />
      <main>
        <h1>Custom Cursor Effect</h1>
        <StyledNav>
          <ul>
            {links.map((link) => {
              return (
                <li
                  key={link}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#">{link}</a>
                </li>
              );
            })}
          </ul>
        </StyledNav>
      </main>
    </>
  );
}
