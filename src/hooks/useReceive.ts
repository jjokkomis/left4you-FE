import { claimCourse, getGiftData } from "@/services/receive";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Region } from "@/types/receive";
import { useRouter } from "next/navigation";

export interface GetGiftOptions {
  enabled?: boolean;
  excludeCourseId?: number;
}

export function useGetGiftData(region: Region, options?: GetGiftOptions) {
  const excludeId = options?.excludeCourseId;
  return useQuery({
    queryKey: ["getGiftData", region, excludeId],
    queryFn: () => getGiftData(region, excludeId),
    enabled: options?.enabled,
  });
}

export function useClaimCourse() {
  const router = useRouter();
  return useMutation({
    mutationKey: ["claimCourse"],
    mutationFn: (params: {region: Region, courseId?: number}) => claimCourse({region: params.region, courseId: params.courseId}),
    onSuccess: () => {
      router.replace("/setting");
    }
  });
}