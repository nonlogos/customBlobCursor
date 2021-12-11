import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    --left-padding: 10rem;
    --bkgd-color: hsl(240 8% 14%);
    --cta-color: hsl(300 100% 50%);
    --element-bkgd: hsl(240 8% 50%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    margin: 0;
    padding: 0;
    background: var(--bkgd-color);
    color: var(--cta-color);
    position: relative;
    margin: 10rem auto;
    width: 60%;
    & * {
      box-sizing: border-box;
    }
    & a {
      text-decoration: none;
      color: var(--cta-color);
    }
    & ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    & main {
      display: flex;
      flex-direction: column;
      position: relative;
    }
  }
`;

export const StyledNav = styled.nav`
  margin: 5rem auto;
  & ul {
    display: flex;
    gap: 3rem;
    justify-content: center;

    & li {
      display: grid;
      height: 100%;
      width: 100%;
      & a {
        font-size: 1.5rem;
        padding: 0.7rem 0.8rem;
        &:hover,
        &:focus {
          color: white;
        }
      }
    }
  }
`;
