"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
   <Wrapper>
    <Image src="/assets/404.svg" alt="Not Found" width={120} height={120} />
    <h1>404</h1>
    <span>요청하신 페이지를 <br /> 찾을 수 없습니다</span>
    <button onClick={() => router.back()}>이전 페이지로 돌아가기</button>
   </Wrapper> 
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    color: #F3484E;
    font-size: 7rem;
  }

  span {
    color: #A0A0A0;
  }
  
  button {
    margin-top: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #b2b2b2;
    font-size: 1.1rem;
    font-family: "MiraeroNormal";

    &:hover {
      color: #a0a0a0;
    }
  }
`;
