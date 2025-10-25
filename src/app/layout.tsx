"use client";
import BottomBar from "@/components/ui/bottomBar/bottomBar";
import NProgressProvider from "@/components/ui/nProgress/NProgressProvider";
import GlobalStyle from "@/styles/GlobalStyle";
import styled from "@emotion/styled";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthGuard from "@/components/layout/AuthGuard";
import { Suspense, useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 모바일 뷰포트 높이 계산
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <body>
          <AuthGuard>
            <Wrapper id="layoutContainer">
              <Suspense fallback={null}>
                <NProgressProvider />
              </Suspense>
              <ContentArea>
                {children}
              </ContentArea>
              <BottomBar />
            </Wrapper>
          </AuthGuard>
        </body>
      </QueryClientProvider>
    </html>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  /* 모바일 뷰포트 높이 사용 (브라우저 UI 제외) */
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  width: 100%;
  padding: 0.5rem 0.2rem;
  padding-bottom: 100px; /* BottomBar 높이 + 여유 공간 */
  overflow-y: auto;
  overflow-x: hidden;
  /* 모바일 스크롤 개선 */
  -webkit-overflow-scrolling: touch;
`;