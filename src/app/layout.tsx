"use client";
import GlobalStyle from "@/styles/GlobalStyle";
import styled from "@emotion/styled";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStyle />
      <body>
        <Wrapper>
          {children}
          <Nav>네브바</Nav>
        </Wrapper>
      </body>
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
  margin: 0 auto;
  row-gap: 4rem;
`;

const Nav = styled.div`
  height: 5rem;
  width: 100%;
  background-color: #364155;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;