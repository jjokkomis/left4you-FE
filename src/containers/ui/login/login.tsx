"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as S from "./style";

export default function LoginContainer() {
  const router = useRouter();
  const kakaoLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/login`;
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <S.Container>
      <S.SlideBox active={showLogin}>
        <S.Screen>
          <Image
            src="/assets/logo.svg"
            alt="편지 아이콘"
            width={120}
            height={120}
          />
          <S.Title>너에게 남긴 하루</S.Title>
          <S.Subtitle>여행으로 만드는 특별한 일상</S.Subtitle>
        </S.Screen>
        <S.Screen>
          <Image
            src="/assets/logo.svg"
            alt="편지 아이콘"
            width={120}
            height={120}
          />
          <S.Title>
            카카오톡으로
            <br />
            로그인하기
          </S.Title>
          {/* <S.Subtitle>
            아직 회원이 아니신가요?{" "}
            <S.RegisterText onClick={handleRegisterClick}>회원가입하기</S.RegisterText>
          </S.Subtitle> */}
          <S.KakaoButton href={kakaoLoginUrl}>
            <Image
              src="/assets/kakao-chat.svg"
              alt="카카오톡 아이콘"
              width={52}
              height={52}
            />
          </S.KakaoButton>
        </S.Screen>
      </S.SlideBox>
    </S.Container>
  );
}
