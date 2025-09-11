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
    type RouterPush = typeof router.push;
    const originalPush: RouterPush = router.push;

    const newPush: RouterPush = (href, opts) => {
      NProgress.start();
      return originalPush(href, opts);
    };

    (router as unknown as { push: RouterPush }).push = newPush;

    return () => {
      (router as unknown as { push: RouterPush }).push = originalPush;
    };
  }, [router]);

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  return null;
}
