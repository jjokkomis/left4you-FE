import { getSurvey } from "@/services/survey";
import { useQuery } from "@tanstack/react-query";
import { Survey } from "@/services/survey";

export function useGetSurvey() {
    return useQuery<Survey>({
        queryKey: ["getSurvey"],
        queryFn: async () => {
            const res = await getSurvey();
            return res || [];
        },
        enabled: false,
    })
}
