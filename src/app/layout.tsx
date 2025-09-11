"use client";
import BottomBar from "@/components/ui/bottomBar/bottomBar";
import NProgressProvider from "@/components/ui/nProgress/NProgressProvider";
import GlobalStyle from "@/styles/GlobalStyle";
import styled from "@emotion/styled";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AuthGuard from "@/components/layout/AuthGuard";
import { Suspense } from "react";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <body>
          <AuthGuard>
            <Wrapper id="layoutContainer">
              <Suspense fallback={null}>
                <NProgressProvider />
              </Suspense>
              {children}
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
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  max-height: 100vh;
  padding: 0.5rem 0.2rem;
  margin: 0 auto;
  row-gap: 4rem;
`;