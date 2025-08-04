'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    iat: number;
    exp: number;
    user_id: number;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {

    if (path === '/login' || path === '/oauth/callback') return;

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { exp } = jwtDecode<JwtPayload>(token);
        if (Date.now() >= exp * 1000) {
          localStorage.clear();
          router.replace('/login');
        }
      } catch {
        localStorage.clear();
        router.replace('/login');
      }
    } else {
        localStorage.clear();
        router.replace('/login');
    }
  }, [router, path]);

  return <>{children}</>;
}