import { createGlobalStyle } from 'styled-components';
import { ThemeName } from './../types/theme.d';

interface Props {
  themeName: ThemeName;
}

const GlobalStyle = createGlobalStyle<Props>`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${(props) => (props.themeName === 'light' ? 'black' : 'white')};
  }

  html, body {
    background-color: ${(props) => (props.themeName === 'light' ? 'white' : 'black')};
    font-family: 'Inter', sans-serif;


    @media ${({ theme }) => theme.mediaQuery.tablet} {
      font-size: 14px;
    }

    @media ${({ theme }) => theme.mediaQuery.mobile} {
      font-size: 12px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    cursor: pointer;
    background: none;
  }

  input[type='checkbox'] {
    appearance: none;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border: 1px solid ${(props) => props.theme.color.thirdText};
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
  }

  input[type="checkbox"]:checked {
    background-color: ${(props) => props.theme.color.primary};
    border: none;
  }

    input[type='checkbox']:checked::after {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    font-size: 12px;
    color: white;
    pointer-events: none;
  }

`;

export default GlobalStyle;
