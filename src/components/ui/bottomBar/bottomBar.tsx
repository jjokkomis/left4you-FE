"use client";

import { usePathname, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";

const MENU_ITEMS = [
  { path: "/make", icon: "/assets/bottomBar/add.svg" },
  { path: "/receive", icon: "/assets/bottomBar/send.svg" },
  { path: "/", icon: "/assets/bottomBar/home.svg" },
  { path: "/map", icon: "/assets/bottomBar/map.svg" },
  { path: "/setting", icon: "/assets/bottomBar/setting.svg" },
];

export default function BottomBar() {
  const path = usePathname();
  const router = useRouter();

  if (
    path === "/login" ||
    path === "/survey" ||
    path.startsWith("/oauth/callback")
  ) {
    return null;
  }

  return (
    <Wrapper>
      {MENU_ITEMS.map((item) => (
        <IconWrapper
          key={item.path}
          onClick={() => router.push(item.path)}
          isActive={path === item.path}
        >
          <Image
            src={item.icon}
            alt={item.path}
            width={28}
            height={28}
            style={{ opacity: path === item.path ? 1 : 0.5 }}
          />
        </IconWrapper>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.2rem 0;
  background-color: #fff;

  @media screen and (min-width: 500px) {
    width: 26%;
  }
`;

const IconWrapper = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    transition: opacity 0.2s ease-in-out;
  }
`;