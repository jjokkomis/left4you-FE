import { useState, useRef, useCallback, useEffect } from "react";
import type { KakaoMapHandle } from "@/types/types";

type LocationCoord = { lat: number; lng: number } | null;
type LocationState = {
    address: string;
    coord: LocationCoord;
    };

    export default function useCourseChoice() {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");
    const [locations, setLocations] = useState<{ A: LocationState; B: LocationState }>({
        A: { address: "", coord: null },
        B: { address: "", coord: null },
    });

    const mapRef = useRef<KakaoMapHandle>(null);
    const inputRefs = {
        A: useRef<HTMLDivElement>(null),
        B: useRef<HTMLDivElement>(null),
    };

    const handleSelectLocation = useCallback(
        (lat: number, lng: number, address: string) => {
        setLocations((prev) => ({
            ...prev,
            [selected]: { address, coord: { lat, lng } },
        }));
        },
        [selected]
    );

    const handleInput = useCallback(
        (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const text = e.currentTarget.textContent || "";
        setLocations((prev) => ({
            ...prev,
            [course]: { ...prev[course], address: text },
        }));

        if (mapRef.current) {
            mapRef.current.moveToAddress(text);
        }
        },
        []
    );

    useEffect(() => {
        Object.entries(inputRefs).forEach(([key, ref]) => {
        const course = key as "A" | "B";
        if (ref.current && ref.current.textContent !== locations[course].address) {
            ref.current.textContent = locations[course].address;
        }
        });
    }, [locations]);

    return {
        courseName,
        setCourseName,
        selected,
        setSelected,
        locations,
        handleSelectLocation,
        handleInput,
        mapRef,
        inputRefs,
    };
}