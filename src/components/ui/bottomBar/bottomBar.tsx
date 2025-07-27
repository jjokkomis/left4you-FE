"use client";

import { usePathname } from "next/navigation";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  height: 5rem;
  width: 100%;
  background-color: #364155;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default function BottomBar() {
  const path = usePathname();

  if (path === "/login" || path === "/register" || path.startsWith("/oauth/callback")) {
    return null;
  }

  return <Wrapper>네브바</Wrapper>;
}
