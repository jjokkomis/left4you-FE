import { useQuery } from "@tanstack/react-query";
import { getTourItems } from "@/services/tour";

export default function useTourItems(lat: number | null, lng: number | null, radius = 5000) {
    const { data: items = [], isLoading: loading, error, refetch } = useQuery({
        queryKey: ["tourItems", lat, lng, radius],
        queryFn: () => getTourItems(lat!, lng!, radius),
        enabled: lat !== null && lng !== null,
        staleTime: 5 * 60 * 1000, // 5분간 캐시
        retry: 1,
    });

    return { 
        items, 
        loading, 
        error: error?.message || null,
        refetch
    };
}