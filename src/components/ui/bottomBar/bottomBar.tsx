"use client";

import { usePathname, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import Image from "next/image";

const MENU_ITEMS = [
  { path: "/create", icon: "/assets/bottomBar/add.svg" },
  { path: "/send", icon: "/assets/bottomBar/send.svg" },
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
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.75rem 0;
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