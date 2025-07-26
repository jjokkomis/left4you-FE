import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      @font-face {
          font-family: 'MiraeroNormal';
          src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/MiraeroNormal.woff') format('woff');
          font-weight: normal;
          font-style: normal;
      }

      html,
      body {
        font-family: "MiraeroNormal", sans-serif;
      }
    
    `}
  />
);

export default GlobalStyle;
