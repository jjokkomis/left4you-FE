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

      /* 모바일 뷰포트 높이 처리 */
      :root {
        --vh: 1vh;
      }

      html {
        /* 모바일 브라우저 주소창 고려한 실제 뷰포트 높이 */
        height: 100%;
        height: -webkit-fill-available;
      }

      body {
        min-height: 100vh;
        min-height: -webkit-fill-available;
        /* 모바일에서 스크롤 바운스 방지 */
        overscroll-behavior: none;
        /* 모바일 터치 스크롤 개선 */
        -webkit-overflow-scrolling: touch;
      }

      html,
      body,
      * {
        font-family: "MiraeroNormal", sans-serif;
      }

      #nprogress .bar {
        background: #364155 !important;
        height: 3px !important;
      }

      #nprogress .peg {
        box-shadow: 0 0 10px rgba(54, 65, 85, 0.6), 0 0 5px rgba(54, 65, 85, 0.6) !important;
      }
    
    `}
  />
);

export default GlobalStyle;
