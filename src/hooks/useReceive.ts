import { getGiftData } from "@/services/receive";
import { useQuery } from "@tanstack/react-query";
import { Region } from "@/types/receive";

export interface GetGiftOptions {
  enabled?: boolean;
}

export function useGetGiftData(region: Region, options?: GetGiftOptions) {
  return useQuery({
    queryKey: ["getGiftData", region],
    queryFn: () => getGiftData(region),
    enabled: options?.enabled,
  });
}