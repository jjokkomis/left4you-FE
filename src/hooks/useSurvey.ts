import { createSurvey, getSurvey } from "@/services/survey";
import { UseQueryResult, UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";
import { Survey, SurveySubmission } from "@/types/survey";
import { useRouter } from "next/navigation";

export function useGetSurvey(options?: { enabled?: boolean }): UseQueryResult<Survey, Error> {
    return useQuery<Survey, Error>({
        queryKey: ["getSurvey"],
        queryFn: async () => {
            const res = await getSurvey();
            return res;
        },
        enabled: options?.enabled,
    })
}

export function useCreateSurvey(): UseMutationResult<void, Error, SurveySubmission> {
    const router = useRouter();

    return useMutation<void, Error, SurveySubmission>({
        mutationFn: (data) => createSurvey(data),
        onSuccess: () => {
            router.replace("/");
        },
        onError: (error) => {
            console.error("설문 저장 실패:", error);
        }
    });
}