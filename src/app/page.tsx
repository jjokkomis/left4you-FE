"use client";
import Main from "@/containers/ui/home/home";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {

  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean|null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  if (loggedIn === null) {
    return (
      <div>로딩 중…</div>
    );
  }

  if (!loggedIn) {
    router.replace("/login");
    return null;
  }

  return (
    <Main />
  );
}