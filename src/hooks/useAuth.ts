import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { kakaoLogin, AuthResponse } from "@/services/auth";
import { useUserStore } from "@/store/useUserStore";
import { useGetSurvey } from "./useSurvey";

export function useKakaoLogin(): UseMutationResult<AuthResponse, Error, string> {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);
  const surveyResult = useGetSurvey();

  return useMutation<AuthResponse, Error, string>({
    mutationFn: (code: string) => kakaoLogin(code),
    onSuccess: async (data) => {
      setUser(data.user);
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      const { data: surveyData } = await surveyResult.refetch();

      router.push(surveyData.count === 0 ? "/survey" : "/");
    },
    onError(err: Error) {
      console.error("Kakao login error", err);
    },
  });
}
