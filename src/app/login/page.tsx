"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const kakaoLoginUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/kakao/login`;

  return (
    <div style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1>로그인이 필요합니다</h1>
      <button
        onClick={() => (window.location.href = kakaoLoginUrl)}
        style={{
          padding: "12px 24px",
          backgroundColor: "#F7E600",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        카카오로 시작하기
      </button>
    </div>
  );
}
