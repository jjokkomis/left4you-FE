"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function NProgressProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  NProgress.configure({
    parent: "#layoutContainer",
    showSpinner: false,
    trickleSpeed: 200,
  })

  useEffect(() => {
    const originalPush = router.push;
    router.push = (href, opts) => {
      NProgress.start();
      // @ts-ignore
      return originalPush(href, opts);
    };
  }, [router]);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
