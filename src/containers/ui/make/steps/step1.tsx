"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import React, { useState, useRef, useCallback, useEffect } from "react";
import type { KakaoMapHandle } from "@/types/types";
import Btn from "@/components/ui/button/button";
import { supabase } from "@/lib/supabaseClient";

export default function Step1() {
    const [courseName, setCourseName] = useState("");
    const [selected, setSelected] = useState<"A" | "B">("A");

    const [locations, setLocations] = useState({
        A: { address: "", coord: null as { lat: number; lng: number } | null },
        B: { address: "", coord: null as { lat: number; lng: number } | null },
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

    const handleInput = (e: React.FormEvent<HTMLDivElement>, course: "A" | "B") => {
        const text = e.currentTarget.textContent || "";
        setLocations((prev) => ({
            ...prev,
            [course]: { ...prev[course], address: text },
        }));

        if (mapRef.current) {
            mapRef.current.moveToAddress(text);
        }
    };

    useEffect(() => {
        Object.entries(inputRefs).forEach(([key, ref]) => {
            const course = key as "A" | "B";
            if (ref.current && ref.current.textContent !== locations[course].address) {
                ref.current.textContent = locations[course].address;
            }
        });
    }, [locations]);

    const saveData = async () => {
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
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>코스 이름</S.Title>
                <S.CourseName
                    placeholder="코스 이름을 입력해주세요"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
            </S.Wrapper>

            <KakaoMap onSelectLocation={handleSelectLocation} ref={mapRef} />
            <h4>{locations[selected].address || "선택한 위치가 없습니다."}</h4>

            <S.Group>
                {["A", "B"].map((course) => (
                    <S.Course
                        key={course}
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        onInput={(e) => handleInput(e, course as "A" | "B")}
                        onClick={() => setSelected(course as "A" | "B")}
                        ref={inputRefs[course as "A" | "B"]}
                    />
                ))}
            </S.Group>

            <Btn onClick={saveData}>위치등록</Btn>
        </S.Container>
    );
}