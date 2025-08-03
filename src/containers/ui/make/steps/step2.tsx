"use client";

import * as S from "../style";
import KakaoMap from "@/components/layout/map/kakaoMap";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Location } from "@/types/types";

export default function Step2() {
    const [courseName, setCourseName] = useState("");
    const [author, setAuthor] = useState("");
    const [locations, setLocations] = useState<{ A: Location; B: Location }>({
        A: { address: "위치 A", coord: null },
        B: { address: "위치 B", coord: null },
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const { data, error } = await supabase
                    .from("course_make")
                    .select("*")
                    .order("id", { ascending: false })
                    .limit(1)
                    .single();

                if (error || !data) {
                    console.error("불러오기 실패:", error);
                    return;
                }

                const content = JSON.parse(data.content);

                if (content.locations?.length === 2) {
                    setLocations({
                        A: { address: "위치 A", coord: content.locations[0] },
                        B: { address: "위치 B", coord: content.locations[1] },
                    });
                }

                setCourseName(data.name || "");
                setAuthor(data.maker_id || "익명");
            } catch (e) { console.error("content 파싱 오류:", e); }};
        fetchCourseData();
    }, []);

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>코스 미리보기</S.Title>
                <S.Pack>
                    <S.PreviewTitle>{courseName}</S.PreviewTitle>
                    <S.Name>{author}</S.Name>
                </S.Pack>
            </S.Wrapper>
            <KakaoMap
                center={locations.A.coord ?? undefined}
                onSelectLocation={() => {}}
            />
            <S.Group>
                {Object.entries(locations).map(([key, location]) => (
                    <S.Course key={key}>
                        {location.address} (
                        {location.coord
                            ? `${location.coord.lat.toFixed(4)}, ${location.coord.lng.toFixed(4)}`
                            : "좌표 없음"}
                        )
                    </S.Course>
                ))}
            </S.Group>
        </S.Container>
    );
}