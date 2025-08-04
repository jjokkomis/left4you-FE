import customAxois from '@/lib/customAxios';

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    profile: string;
  };
}

export async function kakaoLogin(code: string): Promise<AuthResponse> {
  const res = await customAxois.get<AuthResponse>("/auth/kakao/callback", {
    params: { code },
  });
  return res.data;
}
