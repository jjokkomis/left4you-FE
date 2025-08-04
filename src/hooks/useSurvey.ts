import { getSurvey } from "@/services/survey";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Survey } from "@/services/survey";

export function useGetSurvey(): UseQueryResult<Survey, Error> {
    return useQuery<Survey, Error>({
        queryKey: ["getSurvey"],
        queryFn: async () => {
            const res = await getSurvey();
            return res;
        },
        enabled: false,
    })
}
