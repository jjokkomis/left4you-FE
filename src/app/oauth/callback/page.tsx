"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useKakaoLogin } from "@/hooks/useAuth";
import { useUserStore } from "@/store/useUserStore";

export default function OAuthCallbackPage() {
  const params = useSearchParams();
  const code = params.get("code") ?? "";

  const { mutate, status, error } = useKakaoLogin();
  const setUser = useUserStore((s) => s.setUser);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    mutate(code, {
      onSuccess(data) {
        setUser(data.user);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.replace("/");
      },
      onError(err: Error) {
        setLocalError(err.message);
      },
    });
  }, [code, mutate]);

  if (!code) {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh", color: "red" }}>
        인가 코드가 없습니다.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh", color: "red" }}>
        에러: {localError || (error as Error).message}
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        로그인 처리 중…
      </div>
    );
  }

  return null;
}
