"use client";
import styled from "@emotion/styled";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0}}>
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