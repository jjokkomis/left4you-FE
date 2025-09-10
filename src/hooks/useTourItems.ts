import { useState, useEffect } from "react";

interface TourItem {
    contentid: string;
    title: string;
}

export default function useTourItems(lat: number | null, lng: number | null, radius = 5000) {
    const [items, setItems] = useState<TourItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (lat === null || lng === null) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const timer = setTimeout(async () => {
            setLoading(true);
            setError(null);
            try {
                const url = `/api/tour?mapX=${lng}&mapY=${lat}&radius=${radius}`;
                const response = await fetch(url, { signal });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                if (data.error) throw new Error(data.error);

                const items = data.response?.body?.items?.item ?? [];
                setItems(items);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error("관광지 API 호출 에러:", err);
                setError(err.message);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [lat, lng, radius]);

    return { items, loading, error };
}