import { useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react";
import { createCourse } from "@/services/course";
import type { KakaoMapHandle } from "@/types/types";

type LocationCoord = { lat: number; lng: number } | null;
type LocationState = {
    address: string;
    coord: LocationCoord;
};

export default function useCourseChoice() {
    const [courseName, setCourseName] = useState<string>("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });

    const mapRef = useRef<KakaoMapHandle | null>(null);
    const inputRefs = {
        A: useRef<HTMLDivElement | null>(null),
        B: useRef<HTMLDivElement | null>(null),
    };

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) => {
        setLocations((prev) => ({
            ...prev,
            [selected]: { address, coord: { lat, lng } },
        }));}, [selected]
    );

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const text = e.currentTarget.textContent || "";
        setLocations((prev) => ({
            ...prev,
            [course]: { ...prev[course], address: text },
        }));

        if (mapRef.current) {
            mapRef.current.moveToAddress(text); }},
            [] );

    useEffect(() => {
        Object.entries(inputRefs).forEach(([key, ref]) => {
        const course = key as "A" | "B";
        if (ref.current && ref.current.textContent !== locations[course].address) {
            ref.current.textContent = locations[course].address;
        }}); }, [locations]);

    const { mutate } = useMutation({ mutationFn: createCourse });

    const handleSaveData = () => {
        mutate({
        maker_id: "1",
        name: courseName,
        content: {
            coordA: { lat: locations.A.coord?.lat || 0, lng: locations.A.coord?.lng || 0 },
            coordB: { lat: locations.B.coord?.lat || 0, lng: locations.B.coord?.lng || 0 },
        },
        rating: 3,
        message: "사용자가 생성한 코스입니다.",
        });
    };

    return {
        courseName, setCourseName,
        selected, setSelected,
        locations, handleSelectLocation,
        handleInput, mapRef,
        inputRefs, handleSaveData,
    };
}