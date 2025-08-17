import { useState, useRef, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState } from "@/types/types";
import { createCourse, getCourseList, getCourseById } from "@/services/course";

export default function useCourse(courseId?: number) {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });

    const mapRef = useRef<KakaoMapHandle | null>(null);
    const inputRefs = { A: useRef<HTMLDivElement>(null), B: useRef<HTMLDivElement>(null) };

    const { data: courseList, isLoading, error, refetch } = useQuery({
        queryKey: ["courseList"],
        queryFn: getCourseList,
        staleTime: 0,
    });

    const { data: courseDetail, isLoading: isDetailLoading } = useQuery({
        queryKey: ["courseDetail", courseId],
        queryFn: () => getCourseById(courseId!),
        enabled: !!courseId,
    });

    const mutation = useMutation({
        mutationFn: createCourse,
        onSuccess: () => { alert("코스를 성공적으로 등록했습니다!"); refetch(); },
        onError: (err: Error) => console.error(err.message),
    });

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) =>
        setLocations((prev) => ({ ...prev, [selected]: { address, coord: { latitude: lat, longitude: lng } } })),
        [selected]
    );

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const text = e.currentTarget.textContent || "";
        setLocations((prev) => ({ ...prev, [course]: { ...prev[course], address: text } }));
        mapRef.current?.moveToAddress(text);
        },
        []
    );

    const handleSaveData = useCallback(() => {
        const loc = locations[selected];
        if (!courseName || !loc?.address || !loc?.coord) return;
        const { latitude, longitude } = loc.coord;
        if (typeof latitude !== "number" || typeof longitude !== "number") return;
        mutation.mutate({ maker_id: 2, name: courseName, content: "", rating: 2, place_name: loc.address, latitude, longitude });
    }, [courseName, selected, locations, mutation]);

    return { courseName, setCourseName, selected, setSelected, locations, handleSelectLocation,
            handleInput, mapRef, inputRefs, handleSaveData,
            isLoading, courseList, courseListError: error, courseDetail, isDetailLoading };
}