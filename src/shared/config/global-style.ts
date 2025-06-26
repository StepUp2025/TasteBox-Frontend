import { ThemeName } from './../types/theme.d';
import { createGlobalStyle } from 'styled-components';

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
    background-color: ${(props) =>
      props.themeName === 'light' ? 'white' : 'black'};
    font-family: 'Inter', sans-serif;
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
`;

export default GlobalStyle;
