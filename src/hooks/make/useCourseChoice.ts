import { useState, useRef, useCallback, useEffect } from "react";
import type { KakaoMapHandle } from "@/types/types";
import { supabase } from "@/lib/supabaseClient";

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

    // locations 상태가 바뀔 때마다 contentEditable div의 내용 동기화
    useEffect(() => {
        Object.entries(inputRefs).forEach(([key, ref]) => {
        const course = key as "A" | "B";
        if (ref.current && ref.current.textContent !== locations[course].address) {
            ref.current.textContent = locations[course].address;
        }
        });
    }, [locations]);

    // 저장 함수
    const saveData = useCallback(async () => {
        if (!courseName) {
        alert("코스 이름을 입력해주세요.");
        return;
        }
        if (!locations.A.address || !locations.B.address) {
        alert("모든 위치를 입력해주세요.");
        return;
        }
        if (!locations.A.coord || !locations.B.coord) {
        alert("위치 좌표가 올바르지 않습니다.");
        return;
        }

        const data = {
        name: courseName,
        content: JSON.stringify({
            locations: [locations.A.coord, locations.B.coord],
        }),
        rating: 3,
        };

        const { error } = await supabase.from("course_make").insert([data]);
        if (error) {
        alert(error.message);
        } else {
        alert("코스 위치가 성공적으로 저장되었습니다.");
        }
    }, [courseName, locations]);

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
        saveData,
    };
}