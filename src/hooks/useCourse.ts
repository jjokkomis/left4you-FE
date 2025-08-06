import { useState, useRef, useEffect, useCallback } from "react";
import type { KakaoMapHandle, LocationState } from "@/types/types";
import { createCourse } from "@/services/course";

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
        (latitude: number, longitude: number, address: string) => {
        setLocations((prev) => ({
            ...prev,
            [selected]: { address, coord: { latitude, longitude } },
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

    const handleSaveData = async () => {
        if (!courseName) {
        alert("코스 이름을 입력해주세요.");
        return;
        }

        if (!locations[selected]?.address || !locations[selected]?.coord) {
        alert("장소와 좌표를 선택해주세요.");
        return;
        }

        const { latitude, longitude } = locations[selected].coord;

        if (typeof latitude !== "number" || typeof longitude !== "number") {
        alert("위치 좌표가 올바르지 않습니다.");
        return;
        }

        const payload = {
        course: {
            maker_id: 1,
            name: courseName,
            content: "서울 명소를 방문하는 코스입니다.",
            rating: 5,
        },
        place: {
            course_id: 1,
            place_name: locations[selected].address,
            latitude,
            longitude,
        },
        };

    try {
        const response = await createCourse(payload);
            console.log("서버 응답:", response);
            alert("코스와 장소가 성공적으로 등록되었습니다!");
        } catch (error) {
            console.error("등록 중 오류:", error);
            alert("등록 실패: 알 수 없는 오류가 발생했습니다.");
        }
    }

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
        handleSaveData,
    };
}