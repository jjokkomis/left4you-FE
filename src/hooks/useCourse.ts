import { useState, useRef, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import type { KakaoMapHandle, LocationState } from "@/types/types";
import { createCourse } from "@/services/course";

export default function useCourseChoice() {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });

    const mapRef = useRef<KakaoMapHandle | null>(null);
    const inputRefs = { A: useRef(null), B: useRef(null) };

    const mutation = useMutation({
        mutationFn: createCourse,
        onSuccess: (data) => { if (!data?.data) alert("작성을 완료하였습니다"); },
        onError: (e: Error) => console.log(e.message),
    });

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, addr: string) =>
        setLocations(p => ({ ...p, [selected]: { address: addr, coord: { latitude: lat, longitude: lng } } })),
        [selected]
    );

    const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const text = e.currentTarget.textContent || "";
        setLocations(p => ({ ...p, [course]: { ...p[course], address: text } }));
        mapRef.current?.moveToAddress(text);
    }, []);

    const handleSaveData = () => {
        if (!courseName || !locations[selected]?.address || !locations[selected]?.coord) return;
        const { latitude, longitude } = locations[selected].coord;
        if (typeof latitude !== "number" || typeof longitude !== "number") return;
        mutation.mutate({
            course: { maker_id: 1, name: courseName, content: "", rating: 2 },
            place: { course_id: 1, place_name: locations[selected].address, latitude, longitude },
        });
    };

    return {
        courseName, setCourseName, selected, setSelected,
        locations, handleSelectLocation, handleInput,
        mapRef, inputRefs, handleSaveData,
        isLoading: mutation, error: mutation.error
    };
}