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
  left: 50%;
  transform: translateX(-50%);
  width: min(100%, 440px);
  max-width: 440px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.2rem 0;
  background-color: #fff;
  /* 모바일 safe area 고려 */
  padding-bottom: max(1.2rem, env(safe-area-inset-bottom));
  /* 모바일에서 하단 고정 */
  z-index: 1000;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
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